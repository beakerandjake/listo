import { Link } from 'react-router-dom';
import { faLink } from '@fortawesome/pro-regular-svg-icons';
import {
  EllipsisMenuTrigger,
  MenuHeader,
  MenuItem,
  MenuTitle,
  ResponsiveMenu,
  ScrollableMenuContent,
  StatefulMenu,
} from 'components/Menu';

/**
 * Basic Menu for a Dashboard Item.
 * @param {object} props
 * @param {object[]} props.item - The item this menu is for.
 */
export const ItemMenu = ({ item, children }) => {
  return (
    <StatefulMenu>
      {({ open, setOpen }) => (
        <ResponsiveMenu
          open={open}
          onClose={() => setOpen(false)}
          trigger={<EllipsisMenuTrigger onClick={() => setOpen(!open)} />}
          desktopPlacement="bottom-start"
          className="ml-auto"
        >
          <MenuHeader className="flex items-center justify-center">
            <MenuTitle>Item Actions</MenuTitle>
          </MenuHeader>
          <ScrollableMenuContent>
            {children}
            <Link to={`lists/${item.listId}`}>
              <MenuItem icon={faLink} label="Go to List" />
            </Link>
          </ScrollableMenuContent>
        </ResponsiveMenu>
      )}
    </StatefulMenu>
  );
};
