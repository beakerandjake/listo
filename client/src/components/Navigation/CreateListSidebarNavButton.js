import { faPlusCircle } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CreateListDrawer } from 'components/CreateList/CreateListDrawer';
import { useState } from 'react';

/**
 * Button which opens the Create List Drawer.
 */
export const CreateListSidebarNavButton = ({ onListCreated }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex flex-1 items-center gap-2 text-gray-500 hover:text-gray-600"
        onClick={() => setOpen(true)}
      >
        <h3 className="text-md font-medium">Create New List</h3>
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
      <CreateListDrawer
        open={open}
        onClose={() => setOpen(false)}
        onListCreated={newList => {
          setOpen(false);
          onListCreated(newList);
        }}
      />
    </>
  );
};
