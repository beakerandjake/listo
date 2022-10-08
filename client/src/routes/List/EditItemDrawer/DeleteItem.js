import { faTrashCan } from '@fortawesome/pro-solid-svg-icons';
import { itemApi } from 'api';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { IconButton } from 'components/IconButton';
import {
  listItemsActions,
  useListItemsDispatch,
} from 'context/ListItemsContext';
import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

/**
 * Button which deletes an item after getting confirmation from the user.
 * @param {object} props
 * @param {number} itemId - The id of the item to delete.
 */
export const DeleteItem = ({ itemId }) => {
  const [confirming, setConfirming] = useState(false);
  const dispatch = useListItemsDispatch();
  const handleError = useErrorHandler();

  /**
   * Deletes the item.
   * @returns {Promise}
   */
  const deleteItem = () =>
    itemApi
      .deleteItem(itemId)
      .then(() => dispatch({ type: listItemsActions.delete, id: itemId }))
      .catch(handleError);

  return (
    <>
      <IconButton
        icon={faTrashCan}
        title="Delete Item"
        onClick={() => setConfirming(true)}
      />
      <ConfirmDialog
        open={confirming}
        onDismiss={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          deleteItem();
        }}
        variant="danger"
        confirmButtonText="Delete"
        title="Delete Item?"
        message="This item will be permanently deleted."
      />
    </>
  );
};
