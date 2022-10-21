import { useErrorHandler } from 'react-error-boundary';
import cx from 'classnames';
import { itemApi } from 'api';
import { Badge } from 'components/Badge';
import { Card } from 'components/Card';
import {
  listItemsActions,
  useListItemsDispatch,
} from 'context/ListItemsContext';
import { ItemCompletedCheckbox, ItemNameLabel } from 'components/Item';
 import { ItemStatusBar } from './ItemStatusBar';

/**
 * Represents an item in a list. Displayed in a ListItemContainer.
 * @param {Object} props
 * @param {object} props.item - The item.
 * @param {function} props.onClick - Callback invoked when the user clicks the button.
 */
export const Item = ({ item, onClick }) => {
  const dispatch = useListItemsDispatch();
  const handleError = useErrorHandler();

  /**
   * Edit the item.
   * @param {object} changes - The changes to apply to the item.
   **/
  const editItem = (changes) =>
    itemApi
      .editItem(item.id, changes)
      .then((result) => dispatch({ type: listItemsActions.edit, item: result }))
      .catch(handleError);

  return (
    <Card
      className="hover:bg-slate-100 cursor-pointer select-none min-h-[50px]"
      onClick={() => onClick(item.id)}
    >
      <div className="flex items-center py-2 px-3">
        <ItemCompletedCheckbox
          checked={item.completed}
          onChange={(completed) => editItem({ completed })}
        />
        <div
          className={cx({ 'opacity-50': item.completed }, 'pl-3 flex flex-col')}
        >
          <div className="w-full flex items-center gap-2">
            <ItemNameLabel
              completed={item.completed}
              name={item.name}
            />
            {item.quantity > 1 && <Badge>{item.quantity}</Badge>}
          </div>
          <ItemStatusBar {...item} />
        </div>
      </div>
    </Card>
  );
};
