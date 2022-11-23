import { useNavigate } from 'react-router-dom';
import { NavLogo } from 'components/Navigation/NavLogo';
import {
  useSidebarItems,
  useUpdateSidebarItems,
} from 'context/SidebarItemsContext';
import { CreateListSidebarNavButton } from './CreateListSidebarNavButton';
import { SidebarNav } from './SidebarNav';
import { SidebarNavItem } from './SidebarNavItem';

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
    <div className="absolute inset-0 border-r border-gray-200 bg-white">
      {/* Scrollable Area */}
      <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
        <div className="flex items-center justify-center p-4">
          <NavLogo />
        </div>
        <nav className="flex flex-col space-y-1">
          <SidebarNavItem
            key="home"
            to=""
            text="Dashboard"
            iconName="house"
            end
          />

          {lists?.length > 0 && <SidebarNav lists={lists} />}
        </nav>
      </div>
      {/* Fixed Create List Button */}
      <div className="absolute bottom-0 h-14 inset-x-0 border-t border-gray-200 flex items-center px-4 ">
        <CreateListSidebarNavButton onListCreated={onListCreated} />
      </div>
    </div>
  );
}
