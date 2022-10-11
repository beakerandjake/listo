import { Suspense, useCallback, useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Await, useLoaderData } from 'react-router-dom';
import { dashboardApi } from 'api';
import { PageHeader } from 'components/PageHeader';
import { ItemCounts } from './ItemCounts';
import { SectionHeading } from './SectionHeading';
import { UpcomingItems } from './UpcomingItems';

export const Dashboard = () => {
  const handleError = useErrorHandler();
  const loaderData = useLoaderData();
  
  // because the item count stats are reloaded whenever
  // the user edits items, handle this portion outside of the loader.
  const [itemCounts, setItemCounts] = useState(null);

  // query api for the latest item count statistics.
  const updateItemCounts = useCallback(() => {
    dashboardApi
      .getItemCounts()
      .then((result) => setItemCounts(result))
      .catch(handleError);
  }, [handleError]);

  // get item counts on load.
  useEffect(() => {
    updateItemCounts();
  }, [updateItemCounts]);

  return (
    <>
      <PageHeader name="Dashboard" />
      <div className="flex-1 flex flex-col gap-7">
        {/* Item Counts */}
        <ItemCounts {...itemCounts} />
        {/* Item Due Today */}
        <div>
          <SectionHeading title="Items Due Today" />
          <Suspense fallback={<p>Loading due today...</p>}>
            <Await resolve={loaderData.itemsDueToday}>
              {(itemsDueToday) => (
                <UpcomingItems
                  items={itemsDueToday}
                  onItemChange={updateItemCounts}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
};
