import { Outlet, useRouteLoaderData } from 'react-router-dom';
import { ResponsiveLayout } from 'components/ResponsiveLayout';
import {
  SidebarItemsContext,
  UpdateSidebarItemsContext,
} from 'context/SidebarItemsContext';
import { useCallback, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { listApi } from 'api';

export const routeId = 'root';

/**
 * The Root component that all routes will be nested under.
 * Renders a responsive layout with static route-wide components like Nav and Sidebar
 * as well as rendering the current route via outlet.
 */
export const Root = () => {
  const loaderData = useRouteLoaderData(routeId);
  const [sidebarItems, setSidebarItems] = useState(loaderData);
  const handleError = useErrorHandler();

  const updateSidebarItems = useCallback(() => {
    listApi
      .getLists()
      .then((results) => setSidebarItems(results))
      .catch(handleError);
  }, [handleError]);

  return (
    <SidebarItemsContext.Provider value={sidebarItems}>
      <UpdateSidebarItemsContext.Provider value={updateSidebarItems}>
        <ResponsiveLayout>
          <Outlet />
        </ResponsiveLayout>
      </UpdateSidebarItemsContext.Provider>
    </SidebarItemsContext.Provider>
  );
};
