import { SidebarNavItem } from './SidebarNavItem';
import { SidebarHeader } from './SidebarHeader';
import { Badge } from 'components/Badge';

/**
 * Contains SidebarNavItems and allows the user to navigate between pages and lists.
 * @param {Object} props
 * @param {array} props.items - The navigation items to render.
 */
export function SidebarNav({ lists }) {
  return (
    <nav className="flex-1">
      <SidebarNavItem key="home" to="" text="Dashboard" iconName="house" end />
      <SidebarHeader name="Lists" />
      {lists.map((list) => (
        <SidebarNavItem
          key={list.id}
          to={`/lists/${list.id}`}
          text={list.name}
          iconName={list.iconName}
          children={({ isActive }) =>
            list.itemCount > 0 && (
              <Badge size="lg" variant={isActive ? 'success' : 'default'}>
                {list.itemCount}
              </Badge>
            )
          }
        />
      ))}
    </nav>
  );
}
