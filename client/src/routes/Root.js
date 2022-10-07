import { ResponsiveLayout } from 'components/ResponsiveLayout';
import { SidebarContext } from 'context/SidebarContext';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useRouteLoaderData } from 'react-router-dom';

export const routeId = 'root';

/**
 * The Root component that all routes will be nested under.
 * Renders a responsive layout with static route-wide components like Nav and Sidebar
 * as well as rendering the current route via outlet.
 */
export const Root = () => {
  // the react-router loader for this route will provide the initial value of the lists.
  const loaderData = useRouteLoaderData(routeId);
  // maintain internal state of lists, so we can edit itemCounts
  // as the user makes changes to the items in a list without having to re-query an api
  const [lists, setLists] = useState(loaderData);

  // Any time that the loader provides new data, be sure to update our lists
  // to reflect the newly loaded data.
  useEffect(() => {
    setLists(loaderData);
  }, [loaderData]);

  // memoize the context value to prevent re-rendering.
  // only update this context value whenever our lits change.
  const contextValue = useMemo(() => {
    // allow consumers of the context to update the item count of a list whenever items are edited.
    const updateItemCount = (id, itemCount) => {
      setLists(lists.map((x) => (x.id === id ? { ...x, itemCount } : x)));
    };

    return { lists, updateItemCount };
  }, [lists]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <ResponsiveLayout>
        <Outlet />
      </ResponsiveLayout>
    </SidebarContext.Provider>
  );
};
