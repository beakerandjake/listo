import { faTrashCheck } from '@fortawesome/pro-regular-svg-icons';
import { itemApi } from 'api';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { MenuItem } from 'components/Menu';
import {
  listItemsActions,
  useListItems,
  useListItemsDispatch,
} from 'context/ListItemsContext';
import { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

/**
 * A MenuItem which deletes all items in the list marked as completed.
 * @param {Object} props - The props.
 * @param {number} props.listId - The id of the list to modify.
 * @param {function} props.onClick - Invoked when the user has click on this.
 */
export const DeleteCompletedItems = ({ listId, onClick }) => {
  const items = useListItems();
  const dispatch = useListItemsDispatch();
  const [confirming, setConfirming] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleError = useErrorHandler();

  // re-calculate disabled state every time the items of the list change.
  useEffect(() => {
    // we are disabled if every item is already completed.
    setDisabled(items.every((x) => !x.completed));
  }, [items]);

  /**
   * Delete all of the items in the list that are completed.
   * @returns {Promise}
   */
  const deleteItems = () =>
    itemApi
      .bulkDeleteItems(listId, 'completed')
      .then(() => dispatch({ type: listItemsActions.deleteCompleted }))
      .catch(handleError);

  return (
    <>
      <MenuItem
        icon={faTrashCheck}
        variant="warning"
        label="Delete Complete Items"
        disabled={disabled}
        onClick={() => setConfirming(true)}
      />
      <ConfirmDialog
        title="Delete Completed Items?"
        message="All Completed Items in this list will be permanently deleted."
        open={confirming}
        onDismiss={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          deleteItems();
          onClick();
        }}
        variant="danger"
        confirmButtonText="Delete"
      />
    </>
  );
};
