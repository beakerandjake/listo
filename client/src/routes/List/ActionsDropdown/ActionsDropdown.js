import { useState } from 'react';
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

/**
 * Dropdown menu which contains list wide actions.
 * @param {Object} props - The props.
 * @param {number} props.listId - The id of the list.
 * @param {Array} props.items - The items of the list.
 */
export function ActionsDropdown({ listId }) {
  const [open, setOpen] = useState(false);

  return (
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
        <SetAllItemsCompleted
          listId={listId}
          setCompletedTo={true}
          label="Mark All Items Complete"
          icon={faCheck}
          onClick={() => setOpen(false)}
        />
        <SetAllItemsCompleted
          listId={listId}
          setCompletedTo={false}
          label="Mark All Items Active"
          icon={faRotateLeft}
          onClick={() => setOpen(false)}
        />
        <MenuSeparator />
        <DeleteCompletedItems listId={listId} onClick={() => setOpen(false)} />
        <DeleteAllItems listId={listId} onClick={() => setOpen(false)} />
        <MenuSeparator />
        <Link to="edit">
          <MenuItem icon={faGear} label="Settings" />
        </Link>
      </ScrollableMenuContent>
    </ResponsiveMenu>
  );
}
