import { faGear } from '@fortawesome/pro-regular-svg-icons';
import { EditListDrawer } from 'components/List/EditListDrawer';
import { MenuItem, MenuItemLabel } from 'components/Menu';
import { useList, useListDispatch } from 'context/ListContext';
import { useState } from 'react';

export const EditList = ({}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MenuItem icon={faGear} label="Settings" onClick={() => setOpen(true)} />
    <EditListDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};
