import { itemApi } from 'api';
import { MenuItem } from 'components/Menu';
import {
  listItemsActions,
  useListItems,
  useListItemsDispatch,
} from 'context/ListItemsContext';
import { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

/**
 * A MenuItem which updates the completed status of all items in the list.
 * @param {Object} props - The props.
 * @param {number} props.listId - The id of the list to modify.
 * @param {boolean} props.setCompletedTo - Should items completed flag be set to true or false?
 */
export const SetAllItemsCompleted = ({ listId, setCompletedTo, ...props }) => {
  const items = useListItems();
  const [disabled, setDisabled] = useState(true);
  const dispatch = useListItemsDispatch();
  const handleError = useErrorHandler();

  // re-calculate our disabled state any time the items change.
  useEffect(() => {
    // if every item is completed then there isn't anything we can do.
    setDisabled(items.every((x) => x.completed === setCompletedTo));
  }, [items, setCompletedTo]);

  /**
   * Set the completed status of all items in the list.
   */
  const updateItems = () =>
    itemApi
      .bulkEditItems(listId, { completed: setCompletedTo })
      // instead of trying to update the items in place
      // just reload the whole list and replace it.
      // if becomes performance issue bulkEditItems can return the changes
      .then(() => itemApi.getItems(listId))
      .then((result) =>
        dispatch({ type: listItemsActions.replace, items: result })
      )
      .catch(handleError);

  return (
    <MenuItem
      {...props}
      disabled={disabled}
      onClick={() => {
        props.onClick && props.onClick();
        updateItems();
      }}
    />
  );
};
