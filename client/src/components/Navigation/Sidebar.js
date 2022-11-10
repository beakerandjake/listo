import { useNavigate } from 'react-router-dom';
import { NavLogo } from 'components/Navigation/NavLogo';
import {
  useSidebarItems,
  useUpdateSidebarItems,
} from 'context/SidebarItemsContext';
import { CreateListSidebarNavButton } from './CreateListSidebarNavButton';
import { SidebarNav } from './SidebarNav';

/**
 * Sidebar which allows the user to navigate between pages and lists.
 */
export function Sidebar() {
  const lists = useSidebarItems();
  const updateSidebarItems = useUpdateSidebarItems();
  const navigate = useNavigate();

  // when a new list is created, update our items, and then navigate to that page.
  const onListCreated = (newList) => {
    updateSidebarItems();
    navigate(`lists/${newList.id}`);
  };

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
          <CreateListSidebarNavButton onListCreated={onListCreated} />
        </div>
      </div>
    </div>
  );
}
