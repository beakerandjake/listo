import { NavLogo } from 'components/Navigation/NavLogo';
import { useRouteLoaderData } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
import { SidebarNavItem } from './SidebarNavItem';

/**
 * Sidebar which allows the user to navigate between pages and lists.
 */
export function Sidebar() {
  const lists = useRouteLoaderData('root');

  return (
    <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
      <div className="flex-shrink-0 flex  justify-center items-center px-4 py-4 space-y-5">
        <NavLogo />
      </div>
      <div className="flex-grow flex flex-col">
        <nav className="flex-1 bg-white space-y-1">
          {/* When no lists exit, only render a nav item for the "create list" page. */}
          {lists?.length ? (
            <SidebarNav lists={lists} />
          ) : (
            <SidebarNavItem
              key="create"
              to="lists/create"
              text="Create New List"
              iconName="plus"
            />
          )}
        </nav>
      </div>
    </div>
  );
}
