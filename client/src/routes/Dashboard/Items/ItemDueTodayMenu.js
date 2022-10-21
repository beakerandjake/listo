import { Link } from 'react-router-dom';
import { format, nextMonday, startOfDay, startOfTomorrow } from 'date-fns';
import {
  faChevronRight,
  faChevronsRight,
  faLink,
} from '@fortawesome/pro-regular-svg-icons';
import { useEditListItem } from 'context/ListItemsContext';
import {
  EllipsisMenuTrigger,
  MenuHeader,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
  MenuTitle,
  ResponsiveMenu,
  ScrollableMenuContent,
  StatefulMenu,
} from 'components/Menu';

/**
 * Menu for performing actions on an Item that is due today.
 * @param {object} props
 * @param {object[]} props.item - The item this menu is for.
 */
export const ItemDueTodayMenu = ({ item }) => {
  const editItem = useEditListItem();

  const dueDates = [
    {
      icon: faChevronRight,
      label: 'Move to Tomorrow',
      date: startOfTomorrow(),
    },
    {
      icon: faChevronsRight,
      label: 'Move to Next Week',
      date: startOfDay(nextMonday(new Date())),
    },
  ];

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
            {dueDates.map((x) => (
              <MenuItem
                icon={x.icon}
                label={x.label}
                key={x.label}
                onClick={() => editItem(item.id, { dueDate: x.date })}
              >
                <MenuItemLabel className="text-gray-400 font-semibold">
                  {format(x.date, 'E')}
                </MenuItemLabel>
              </MenuItem>
            ))}
            <MenuSeparator />
            <Link to={`lists/${item.listId}`}>
              <MenuItem icon={faLink} label="Go to List" />
            </Link>
          </ScrollableMenuContent>
        </ResponsiveMenu>
      )}
    </StatefulMenu>
  );
};
