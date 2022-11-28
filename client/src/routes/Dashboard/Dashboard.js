import { useCallback, useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { itemApi, statsApi } from 'api';
import { PageHeader } from 'components/PageHeader';
import { ItemCounts } from './ItemCounts';
import { AverageItemCompletionTime } from './AverageItemCompletionTime';
import { SectionHeader } from './SectionHeader';
import { StatCardSkeleton } from './StatCardSkeleton';
import {
  ItemsCardDueToday,
  ItemsCardDueNextSevenDays,
  ItemsCardOverdue,
  ItemsCardSkeleton,
} from './Items';
import { EmptyState } from './EmptyState';
import {
  useSidebarItems,
  useUpdateSidebarItems,
} from 'context/SidebarItemsContext';

/**
 * Home page of the application, displays useful statistics and summaries.
 */
export const Dashboard = () => {
  const [itemCounts, setItemCounts] = useState(null);
  const [averageCompletionTime, setAverageCompletionTime] = useState(null);
  const [overdueItems, setOverdueItems] = useState(null);
  const [itemsDueToday, setItemsDueToday] = useState(null);
  const [itemsDueNextSevenDays, setItemsDueNextSevenDays] = useState(null);
  const sidebarItems = useSidebarItems();
  const updateSidebarItems = useUpdateSidebarItems();
  const handleError = useErrorHandler();

  const getItemCounts = useCallback(() => {
    statsApi
      .getItemCounts()
      .then((result) => setItemCounts(result))
      .catch(handleError);
  }, [handleError]);

  const getAverageCompletionTime = useCallback(() => {
    statsApi
      .getAverageItemCompletionTime()
      .then(({ timeInMs }) => setAverageCompletionTime(timeInMs))
      .catch(handleError);
  }, [handleError]);

  const getItemsDueNextSevenDays = useCallback(() => {
    itemApi
      .getItemsDueNextSevenDays()
      .then((result) => setItemsDueNextSevenDays(result))
      .catch(handleError);
  }, [handleError]);

  /**
   * Update various data when an item is marked as completed
   */
  const onItemCompleted = useCallback(() => {
    getItemCounts();
    getAverageCompletionTime();
    updateSidebarItems();
  }, [getItemCounts, getAverageCompletionTime, updateSidebarItems]);

  // load data on mount.
  useEffect(() => {
    getItemCounts();
    getAverageCompletionTime();
    getItemsDueNextSevenDays();

    itemApi
      .getOverdueItems()
      .then((result) => setOverdueItems(result))
      .catch(handleError);

    itemApi
      .getItemsDueToday()
      .then((result) => setItemsDueToday(result))
      .catch(handleError);
  }, [
    getItemCounts,
    getAverageCompletionTime,
    getItemsDueNextSevenDays,
    handleError,
  ]);

  // If there are no lists, show the empty state.
  if (!sidebarItems?.length) {
    return (
      <>
        <PageHeader name="Dashboard" />
        <div className="mt-5 flex-1 flex flex-col gap-5">
          <EmptyState />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader name="Dashboard" />
      <div className="mt-5 flex-1 flex flex-col gap-5">
        {/* Item Counts */}
        <ItemCounts {...itemCounts} />
        <div className="flex flex-col gap-5">
          {/* Items Due Today */}
          {itemsDueToday === null ? (
            <ItemsCardSkeleton />
          ) : (
            <ItemsCardDueToday
              items={itemsDueToday}
              onItemCompleted={onItemCompleted}
              onItemDueDatePostponed={getItemsDueNextSevenDays}
            />
          )}
          {/* Overdue Items */}
          {overdueItems === null ? (
            <ItemsCardSkeleton />
          ) : (
            <ItemsCardOverdue
              items={overdueItems}
              onItemCompleted={onItemCompleted}
            />
          )}
          {/* Items due next seven days */}
          {itemsDueNextSevenDays === null ? (
            <ItemsCardSkeleton />
          ) : (
            <ItemsCardDueNextSevenDays
              items={itemsDueNextSevenDays}
              onItemCompleted={onItemCompleted}
            />
          )}
        </div>
        {/* Historical Data */}
        <div>
          <SectionHeader title="Statistics" />
          {/* Average Completion Time */}
          {averageCompletionTime === null ? (
            <StatCardSkeleton />
          ) : (
            <AverageItemCompletionTime timeInMs={averageCompletionTime} />
          )}
        </div>
      </div>
    </>
  );
};
