import { Suspense, useCallback, useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Await, useLoaderData } from 'react-router-dom';
import { itemApi, statsApi } from 'api';
import { PageHeader } from 'components/PageHeader';
import { ItemCounts } from './ItemCounts';
import { AverageItemCompletionTime } from './AverageItemCompletionTime';
import { SectionHeader } from './SectionHeader';
import {
  ItemsCardDueToday,
  ItemsCardDueNextSevenDays,
  ItemsCardOverdue,
  ItemsCardSkeleton,
} from './Items';
import { StatCardSkeleton } from './StatCardSkeleton';

export const Dashboard = () => {
  const handleError = useErrorHandler();
  const loaderData = useLoaderData();

  // because the item count stats are reloaded whenever
  // the user edits items, handle this portion outside of the loader.
  const [itemCounts, setItemCounts] = useState(null);
  const [averageCompletionTime, setAverageCompletionTime] = useState(null);
  const [overdueItems, setOverdueItems] = useState(null);
  const [itemsDueToday, setItemsDueToday] = useState(null);

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

  // load data on mount.
  useEffect(() => {
    getItemCounts();
    getAverageCompletionTime();

    itemApi
      .getOverdueItems()
      .then((result) => setOverdueItems(result))
      .catch(handleError);

    itemApi
      .getItemsDueToday()
      .then((result) => setItemsDueToday(result))
      .catch(handleError);
  }, [getItemCounts, getAverageCompletionTime, handleError]);

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
              onItemCompleted={() => getItemCounts()}
            />
          )}
          {/* Overdue Items */}
          {overdueItems === null ? (
            <ItemsCardSkeleton />
          ) : (
            <ItemsCardOverdue
              items={overdueItems}
              onItemCompleted={() => getItemCounts()}
            />
          )}
          {/* Items due next seven days */}
          <Suspense fallback={<ItemsCardSkeleton />}>
            <Await resolve={loaderData.itemsDueNextSevenDays}>
              {(items) => (
                <ItemsCardDueNextSevenDays
                  items={items}
                  onItemCompleted={() => getItemCounts()}
                />
              )}
            </Await>
          </Suspense>
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
