import { Outlet, useRouteLoaderData } from 'react-router-dom';
import { ResponsiveLayout } from 'components/ResponsiveLayout';
import { SidebarItemsProvider } from 'context/SidebarItemsContext';

export const routeId = 'root';

/**
 * The Root component that all routes will be nested under.
 * Renders a responsive layout with static route-wide components like Nav and Sidebar
 * as well as rendering the current route via outlet.
 */
export const Root = () => {
  const sidebarItems = useRouteLoaderData(routeId);

  return (
    <SidebarItemsProvider initialItems={sidebarItems}>
      <ResponsiveLayout>
        <Outlet />
      </ResponsiveLayout>
    </SidebarItemsProvider>
  );
};
