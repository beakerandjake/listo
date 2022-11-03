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
 * @param {object[]} props.item - The item to display.
 */
export const ItemDueToday = ({ item }) => {
  const editItem = useEditListItem();

  return (
    <ItemContent key={item.id}>
      <ItemCompletedCheckbox
        checked={item.completed}
        onChange={(completed) => editItem(item.id, { completed })}
      />
      <ItemNameLabel name={item.name} className="pl-3" />
      <div className="ml-auto">
        <ItemDueTodayMenu item={item} />
      </div>
    </ItemContent>
  );
};
