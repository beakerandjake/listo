import { Drawer } from 'components/Drawer';
import { useState } from 'react';

export const CreateListDrawer = ({ open = false, onClose = () => {} }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      size="full"
      contentClassName="max-w-md"
    >
      Hello Nurse
    </Drawer>
  );
};
