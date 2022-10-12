import { Suspense, useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Await, useLoaderData } from 'react-router-dom';
import { dashboardApi } from 'api';
import { PageHeader } from 'components/PageHeader';
import { ItemCounts } from './ItemCounts';
import { OverdueItems } from './OverdueItems';
import { ItemsPanelSkeleton } from './ItemsPanelSkeleton';
import { ItemsDueToday } from './ItemsDueToday';

export const Dashboard = () => {
  const handleError = useErrorHandler();
  const loaderData = useLoaderData();

  // because the item count stats are reloaded whenever
  // the user edits items, handle this portion outside of the loader.
  const [itemCounts, setItemCounts] = useState(null);

  // query api for the latest item count statistics.
  const updateItemCounts = () => {
    dashboardApi
      .getItemCounts()
      .then((result) => setItemCounts(result))
      .catch(handleError);
  };

  // get item counts on page load.
  useEffect(updateItemCounts, [handleError]);

  return (
    <>
      <PageHeader name="Dashboard" />
      <div className="flex-1 flex flex-col gap-7">
        {/* Item Counts */}
        <ItemCounts {...itemCounts} />
        {/* Items Due Today */}
        <Suspense fallback={<ItemsPanelSkeleton />}>
          <Await resolve={loaderData.itemsDueToday}>
            {(items) => (
              <ItemsDueToday
                items={items}
                onItemCompleted={() => updateItemCounts()}
              />
            )}
          </Await>
        </Suspense>
        {/* Overdue Items */}
        <Suspense fallback={<ItemsPanelSkeleton collapsed={true} />}>
          <Await resolve={loaderData.overdueItems}>
            {(items) => (
              <OverdueItems
                items={items}
                onItemCompleted={() => updateItemCounts()}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
};
