import {
  ItemCompletedCheckbox,
  ItemContent,
  ItemNameLabel,
} from 'components/Item';
import { useEditListItem } from 'context/ListItemsContext';
import { ItemDueTodayMenu } from './ItemDueTodayMenu';

/**
 * Renders an Item which is due today.
 * @param {object} props
 * @param {object} props.item - The item to display.
 * @param {function} props.onDueDatePostponed - Function invoked when the user postpones the due date of an item.
 */
export const ItemDueToday = ({ item, onDueDatePostponed }) => {
  const editItem = useEditListItem();

  return (
    <ItemContent key={item.id}>
      <ItemCompletedCheckbox
        checked={item.completed}
        onChange={(completed) => editItem(item.id, { completed })}
      />
      <ItemNameLabel name={item.name} className="pl-3" />
      <div className="ml-auto">
        <ItemDueTodayMenu item={item} onDueDatePostponed={onDueDatePostponed} />
      </div>
    </ItemContent>
  );
};
