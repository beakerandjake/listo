import { Suspense, useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Await, useLoaderData } from 'react-router-dom';
import { statsApi } from 'api';
import { PageHeader } from 'components/PageHeader';
import { ItemCounts } from './ItemCounts';
import { OverdueItems } from './OverdueItems';
import { CollapsibleSectionSkeleton } from './CollapsibleSectionSkeleton';
import { ItemsDueToday } from './ItemsDueToday';
import { ItemsDueNextSevenDays } from './ItemsDueNextSevenDays';
import { AverageItemCompletionTime } from './AverageItemCompletionTime';
import { SectionHeader } from './SectionHeader';

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
      <div className="flex-1 flex flex-col gap-7">
        {/* Item Counts */}
        <ItemCounts {...itemCounts} />
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-3">
          {/* Items Due Today */}
          <Suspense fallback={<CollapsibleSectionSkeleton />}>
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
          <Suspense fallback={<CollapsibleSectionSkeleton collapsed={true} />}>
            <Await resolve={loaderData.overdueItems}>
              {(items) => (
                <OverdueItems
                  items={items}
                  onItemCompleted={() => updateItemCounts()}
                />
              )}
            </Await>
          </Suspense>
          {/* Next Seven Days */}
          <Suspense fallback={<CollapsibleSectionSkeleton collapsed={true} />}>
            <Await resolve={loaderData.itemsDueNextSevenDays}>
              {(items) => (
                <ItemsDueNextSevenDays
                  items={items}
                  onItemCompleted={() => updateItemCounts()}
                />
              )}
            </Await>
          </Suspense>
        </div>

        {/* Historical Data */}
        <SectionHeader title="Statistics" />
        <AverageItemCompletionTime />
      </div>
    </>
  );
};
