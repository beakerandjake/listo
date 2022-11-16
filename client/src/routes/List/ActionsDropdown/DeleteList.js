import { useState } from 'react';
import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { useErrorHandler } from 'react-error-boundary';
import { listApi } from 'api';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { MenuItem } from 'components/Menu';
import { useUpdateSidebarItems } from 'context/SidebarItemsContext';
import { useNavigate } from 'react-router-dom';

export const DeleteList = ({ listId }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const updateSidebarItems = useUpdateSidebarItems();
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  // call the api to delete the list.
  const deleteList = () =>
    listApi
      .deleteList(listId, 'completed')
      .then(() => {
        updateSidebarItems();
        navigate('/')
      })
      .catch(handleError);

  return (
    <>
      <MenuItem
        icon={faTriangleExclamation}
        variant="danger"
        label="Delete List"
        onClick={() => setConfirmingDelete(true)}
      />
      <ConfirmDialog
        title="Delete List?"
        message="This List and all of its Items will be permanently deleted."
        open={confirmingDelete}
        onDismiss={() => setConfirmingDelete(false)}
        onConfirm={() => {
          setConfirmingDelete(false);
          deleteList();
        }}
        variant="danger"
        confirmButtonText="Delete"
      />
    </>
  );
};
