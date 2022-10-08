import { SidebarNavItem } from './SidebarNavItem';
import { SidebarHeader } from './SidebarHeader';
import { Badge } from 'components/Badge';

/**
 * SidebarNavItem which allows the user to navigate to a List.
 * @param {Object} props
 * @param {array} props.items - The navigation items to render.
 */
const ListSidebarNavItem = ({ id, name, iconName, itemCount }) => {
  return (
    <SidebarNavItem
      to={`/lists/${id}`}
      text={name}
      iconName={iconName}
      children={({ isActive }) =>
        itemCount > 0 && (
          <Badge size="lg" variant={isActive ? 'success' : 'default'}>
            {itemCount}
          </Badge>
        )
      }
    />
  );
};

/**
 * Contains SidebarNavItems and allows the user to navigate between pages and lists.
 * @param {Object} props
 * @param {array} props.items - The navigation items to render.
 */
export function SidebarNav({ lists }) {
  const listNavItems = lists.map((list) => (
    <ListSidebarNavItem key={list.id} {...list} />
  ));

  return (
    <nav className="flex-1">
      <SidebarNavItem key="home" to="" text="Dashboard" iconName="house" end />
      <SidebarHeader name="Lists" />
      {listNavItems}
      <SidebarNavItem
        key="create"
        to="/lists/create"
        text="Create New List"
        iconName="plus"
      />
    </nav>
  );
}
