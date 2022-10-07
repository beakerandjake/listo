import { ResponsiveLayout } from 'components/ResponsiveLayout';
import { SidebarContext } from 'context/SidebarContext';
import { useEffect, useState } from 'react';
import { Outlet, useRouteLoaderData } from 'react-router-dom';

export const routeId = 'root';

/**
 * The Root component that all routes will be nested under.
 * Renders a responsive layout with static route-wide components like Nav and Sidebar
 * as well as rendering the current route via outlet.
 */
export const Root = () => {
  const loaderData = useRouteLoaderData(routeId);
  const [lists, setLists] = useState(loaderData);

  // Any time that the loader provides new data, be sure to update our lists
  // to reflect the newly loaded data.
  useEffect(() => {
    setLists(loaderData);
  }, [loaderData]);

  /**
   * Updates the active item count of the specified list.
   * @param {number} id - The id of the list to edit
   * @param {number} itemCount - The number of active items in the list
   */
  const updateItemCount = (id, itemCount) => {
    setLists(lists.map((x) => (x.id === id ? { ...x, itemCount } : x)));
  };

  return (
    <SidebarContext.Provider value={{ lists, updateItemCount }}>
      <ResponsiveLayout>
        <Outlet />
      </ResponsiveLayout>
    </SidebarContext.Provider>
  );
};
