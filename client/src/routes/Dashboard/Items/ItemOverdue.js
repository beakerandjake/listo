import {
  ItemCompletedCheckbox,
  ItemContent,
  ItemDueDateStatusField,
  ItemNameLabel,
  ItemStatusBar,
} from 'components/Item';
import { useEditListItem } from 'context/ListItemsContext';
import { ItemMenu } from './ItemMenu';

/**
 * Renders an Item which is overdue.
 * @param {object} props
 * @param {object[]} props.item - The item to display.
 */
export const ItemOverdue = ({ item }) => {
  const editItem = useEditListItem();

  return (
    <ItemContent key={item.id}>
      <ItemCompletedCheckbox
        checked={item.completed}
        onChange={(completed) => editItem(item.id, { completed })}
      />
      <div className="pl-3 flex flex-col">
        <ItemNameLabel name={item.name} />
        <ItemStatusBar>
          <ItemDueDateStatusField dueDate={item.dueDate} addPrefix={false} />
        </ItemStatusBar>
      </div>
      <div className="ml-auto">
        <ItemMenu item={item} />
      </div>
    </ItemContent>
  );
};
