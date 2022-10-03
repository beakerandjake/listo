import { useState } from 'react';
import {
  faCheck,
  faGear,
  faRotateLeft,
  faTrashCheck,
  faTriangleExclamation,
} from '@fortawesome/pro-regular-svg-icons';
import { Link } from 'react-router-dom';
import { ConfirmDialog } from 'components/ConfirmDialog';
import {
  EllipsisMenuTrigger,
  MenuHeader,
  MenuItem,
  MenuSeparator,
  MenuTitle,
  ResponsiveMenu,
  ScrollableMenuContent,
} from 'components/Menu';

const bulkDeleteDialogConfigs = {
  completed: {
    filter: 'completed',
    title: 'Delete Completed Items?',
    message: 'All Completed Items in this list will be permanently deleted.',
  },
  all: {
    filter: null,
    title: 'Delete All Items?',
    message: 'All Items in this list will be permanently deleted.',
  },
};

/**
 * Dropdown menu which contains list wide actions.
 * @param {Object} props - The props.
 * @param {Array} props.items - The items of the list.
 * @param {function} props.onBulkEdit - Callback invoked when the user wants to perform a bulk edit of items in the list.
 * @param {function} props.onBulkDelete - Callback invoked when the user wants to perform a bulk delete of items in the list.
 */
export function ActionsDropdown({ items, onBulkEdit, onBulkDelete }) {
  const [open, setOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogConfig, setConfirmDialogConfig] = useState(null);

  return (
    <>
      <ResponsiveMenu
        open={open}
        onClose={() => setOpen(false)}
        trigger={<EllipsisMenuTrigger onClick={() => setOpen(!open)} />}
        desktopPlacement="bottom-start"
      >
        <MenuHeader className="flex items-center justify-center">
          <MenuTitle>List Actions</MenuTitle>
        </MenuHeader>
        <ScrollableMenuContent>
          {/* List Actions, only show if there actually is items. */}
          {items?.length > 0 && (
            <>
              <MenuItem
                icon={faCheck}
                label="Mark All Items Complete"
                disabled={items.every((x) => x.completed)}
                onClick={() => {
                  setOpen(false);
                  onBulkEdit({ completed: true });
                }}
              />
              <MenuItem
                icon={faRotateLeft}
                label="Mark All Items Active"
                disabled={items.every((x) => !x.completed)}
                onClick={() => {
                  setOpen(false);
                  onBulkEdit({ completed: false });
                }}
              />
              <MenuSeparator />
              <MenuItem
                icon={faTrashCheck}
                variant="warning"
                label="Delete Complete Items"
                disabled={items.every((x) => !x.completed)}
                onClick={() => {
                  setConfirmDialogOpen(true);
                  setConfirmDialogConfig(bulkDeleteDialogConfigs.completed);
                }}
              />
              <MenuItem
                icon={faTriangleExclamation}
                variant="danger"
                label="Delete All Items"
                disabled={items.length < 1}
                onClick={() => {
                  setConfirmDialogOpen(true);
                  setConfirmDialogConfig(bulkDeleteDialogConfigs.all);
                }}
              />
              <MenuSeparator />
            </>
          )}
          {/* List Settings Link */}
          <Link to="edit">
            <MenuItem icon={faGear} label="Settings" />
          </Link>
        </ScrollableMenuContent>
      </ResponsiveMenu>

      {/* Get users confirmation when performing bulk delete */}
      <ConfirmDialog
        {...confirmDialogConfig}
        open={confirmDialogOpen}
        onDismiss={() => setConfirmDialogOpen(false)}
        onConfirm={() => {
          setOpen(false);
          setConfirmDialogOpen(false);
          onBulkDelete(confirmDialogConfig.filter);
        }}
        variant="danger"
        confirmButtonText="Delete"
      />
    </>
  );
}
