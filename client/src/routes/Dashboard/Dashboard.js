import { PageHeader } from 'components/PageHeader';
import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { ItemCounts } from './ItemCounts';

export function Dashboard(props) {
  const loaderData = useLoaderData();

  return (
    <div className="flex-1 flex flex-col gap-2">
      <PageHeader name="Dashboard"/>
      <Suspense fallback={<p>Loading Dashboard...</p>}>
        <Await resolve={loaderData.itemCounts}>
          {(itemCounts) => <ItemCounts {...itemCounts} />}
        </Await>
      </Suspense>
    </div>
  );
}
