import { PageHeader } from 'components/PageHeader';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { ItemCounts } from './ItemCounts';
import { UpcomingItems } from './UpcomingItems';

export function Dashboard(props) {
  const loaderData = useLoaderData();

  return (
    <>
      <PageHeader name="Dashboard" />
      <div className="flex-1 flex flex-col gap-7">
        {/* Item Counts */}
        <Suspense fallback={<p>Loading Dashboard...</p>}>
          <Await resolve={loaderData.itemCounts}>
            {(itemCounts) => <ItemCounts {...itemCounts} />}
          </Await>
        </Suspense>
        {/* Item Due Today */}
        <Suspense fallback={<p>Loading due today...</p>}>
          <Await resolve={loaderData.itemsDueToday}>
            {(itemsDueToday) => <UpcomingItems items={itemsDueToday} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
}
