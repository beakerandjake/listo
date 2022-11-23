import { useState } from 'react';
import { faPlusCircle } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { CreateListDrawer } from 'components/List/CreateListDrawer';
import { useUpdateSidebarItems } from 'context/SidebarItemsContext';
import { useNavigate } from 'react-router-dom';

/**
 * Button which informs the user that no lists exist, and allows them to create one.
 */
export const EmptyState = () => {
  const [open, setOpen] = useState(false);
  const updateSidebarItems = useUpdateSidebarItems();
  const navigate = useNavigate();

  // when a new list is created, update our items, and then navigate to that page.
  const onListCreated = (newList) => {
    updateSidebarItems();
    navigate(`lists/${newList.id}`);
  };

  return (
    <>
      <button
        type="button"
        className={cx(
          'relative block w-full rounded-lg border-2 border-dashed border-gray-300',
          'p-12 text-center hover:border-gray-400 keyboard-only-focus-ring'
        )}
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon
          icon={faPlusCircle}
          size="2x"
          className="text-gray-400"
        />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No Lists</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new list.
        </p>
      </button>
      <CreateListDrawer
        open={open}
        onClose={() => setOpen(false)}
        onListCreated={(newList) => {
          setOpen(false);
          onListCreated(newList);
        }}
      />
    </>
  );
};
