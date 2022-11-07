import { faPlusCircle } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLogo } from 'components/Navigation/NavLogo';
import { useSidebarItems } from 'context/SidebarItemsContext';
import { SidebarNav } from './SidebarNav';

/**
 * Sidebar which allows the user to navigate between pages and lists.
 */
export function Sidebar() {
  const lists = useSidebarItems();

  return (
    <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
      <div className="flex-shrink-0 flex  justify-center items-center px-4 py-4 space-y-5">
        <NavLogo />
      </div>
      <div className="flex-grow flex flex-col">
        <nav className="flex-1 bg-white space-y-1">
          {/* When no lists exit, only render a nav item for the "create list" page. */}
          {lists?.length > 0 && <SidebarNav lists={lists} />}
        </nav>
        <div className="flex flex-shrink-0 border-t border-gray-200 py-4 px-4">
          <button className="flex flex-1 items-center gap-2 text-gray-500 hover:text-gray-600">
            <h3 className="text-md font-medium">Create New List</h3>
            <FontAwesomeIcon icon={faPlusCircle} />
          </button>
        </div>
      </div>
    </div>
  );
}
