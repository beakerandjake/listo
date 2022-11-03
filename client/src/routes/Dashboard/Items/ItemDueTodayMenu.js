import { format, nextMonday, startOfDay, startOfTomorrow } from 'date-fns';
import {
  faChevronRight,
  faChevronsRight,
} from '@fortawesome/pro-regular-svg-icons';
import { useEditListItem } from 'context/ListItemsContext';
import { MenuItem, MenuItemLabel, MenuSeparator } from 'components/Menu';
import { ItemMenu } from './ItemMenu';

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
    <ItemMenu item={item}>
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
    </ItemMenu>
  );
};
