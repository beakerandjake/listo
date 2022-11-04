import { Suspense, useCallback, useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Await, useLoaderData } from 'react-router-dom';
import { statsApi } from 'api';
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
import { StatCard } from './StatCard';
import { StatCardSkeleton } from './StatCardSkeleton';

export const Dashboard = () => {
  const handleError = useErrorHandler();
  const loaderData = useLoaderData();

  // because the item count stats are reloaded whenever
  // the user edits items, handle this portion outside of the loader.
  const [itemCounts, setItemCounts] = useState(null);
  const [averageCompletionTime, setAverageCompletionTime] = useState(null);

  const updateItemCounts = useCallback(() => {
    statsApi
      .getItemCounts()
      .then((result) => setItemCounts(result))
      .catch(handleError);
  }, [handleError]);

  const updateAverageCompletionTime = useCallback(() => {
    statsApi
      .getAverageItemCompletionTime()
      .then(({ timeInMs }) => setAverageCompletionTime(timeInMs))
      .catch(handleError);
  }, [handleError]);

  // load all data once on mount.
  useEffect(() => {
    updateItemCounts();
    updateAverageCompletionTime();
  }, [updateItemCounts, updateAverageCompletionTime]);

  return (
    <>
      <PageHeader name="Dashboard" />
      <div className="mt-5 flex-1 flex flex-col gap-5">
        {/* Item Counts */}
        <ItemCounts {...itemCounts} />
        <div className="flex flex-col gap-5">
          {/* Items Due Today */}
          <Suspense fallback={<ItemsCardSkeleton />}>
            <Await resolve={loaderData.itemsDueToday}>
              {(items) => (
                <ItemsCardDueToday
                  items={items}
                  onItemCompleted={() => updateItemCounts()}
                />
              )}
            </Await>
          </Suspense>
          {/* Items Due Today */}
          <Suspense fallback={<ItemsCardSkeleton />}>
            <Await resolve={loaderData.overdueItems}>
              {(items) => (
                <ItemsCardOverdue
                  items={items}
                  onItemCompleted={() => updateItemCounts()}
                />
              )}
            </Await>
          </Suspense>
          {/* Overdue Items */}
          <Suspense fallback={<ItemsCardSkeleton />}>
            <Await resolve={loaderData.itemsDueNextSevenDays}>
              {(items) => (
                <ItemsCardDueNextSevenDays
                  items={items}
                  onItemCompleted={() => updateItemCounts()}
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
