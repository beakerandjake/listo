import { faTriangleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { MenuItem } from 'components/Menu';
import { useState } from 'react';

export const DeleteList = () => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <>
      <MenuItem
        icon={faTriangleExclamation}
        variant="danger"
        label="Delete List"
        onClick={() => setConfirmingDelete(true)}
      />
    </>
  );
};
