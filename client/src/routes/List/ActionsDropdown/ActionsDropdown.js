import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  faCheck,
  faGear,
  faRotateLeft,
} from '@fortawesome/pro-regular-svg-icons';
import {
  EllipsisMenuTrigger,
  MenuHeader,
  MenuItem,
  MenuSeparator,
  MenuTitle,
  ResponsiveMenu,
  ScrollableMenuContent,
} from 'components/Menu';
import { SetAllItemsCompleted } from './SetAllItemsCompleted';
import { DeleteCompletedItems } from './DeleteCompletedItems';
import { DeleteAllItems } from './DeleteAllItems';
import { EditList } from './EditList';

/**
 * Dropdown menu which contains list wide actions.
 * @param {Object} props - The props.
 * @param {number} props.listId - The id of the list.
 * @param {Array} props.items - The items of the list.
 */
export function ActionsDropdown({ listId }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setOpen((previous) => !previous);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ResponsiveMenu
      open={open}
      onClose={closeMenu}
      trigger={<EllipsisMenuTrigger onClick={toggleMenu} />}
      desktopPlacement="bottom-start"
    >
      <MenuHeader className="flex items-center justify-center">
        <MenuTitle>List Actions</MenuTitle>
      </MenuHeader>
      <ScrollableMenuContent>
        <SetAllItemsCompleted
          listId={listId}
          setCompletedTo={true}
          label="Mark All Items Complete"
          icon={faCheck}
          onClick={closeMenu}
        />
        <SetAllItemsCompleted
          listId={listId}
          setCompletedTo={false}
          label="Mark All Items Active"
          icon={faRotateLeft}
          onClick={closeMenu}
        />
        <MenuSeparator />
        <DeleteCompletedItems listId={listId} onClick={closeMenu} />
        <DeleteAllItems listId={listId} onClick={closeMenu} />
        <MenuSeparator />
        <EditList />
      </ScrollableMenuContent>
    </ResponsiveMenu>
  );
}
