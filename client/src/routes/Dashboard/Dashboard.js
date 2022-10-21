import { Suspense, useEffect, useState } from 'react';
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

export const Dashboard = () => {
  const handleError = useErrorHandler();
  const loaderData = useLoaderData();

  // because the item count stats are reloaded whenever
  // the user edits items, handle this portion outside of the loader.
  const [itemCounts, setItemCounts] = useState(null);

  // query api for the latest item count statistics.
  const updateItemCounts = () => {
    statsApi
      .getItemCounts()
      .then((result) => setItemCounts(result))
      .catch(handleError);
  };

  // get item counts on page load.
  useEffect(updateItemCounts, [handleError]);

  return (
    <>
      <PageHeader name="Dashboard" />
      <div className="flex-1 flex flex-col gap5">
        {/* Item Counts */}
        <ItemCounts {...itemCounts} />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
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

          <div>
            {/* Historical Data */}
            <SectionHeader title="Statistics" />
            <AverageItemCompletionTime />
          </div>
        </div>
      </div>
    </>
  );
};
