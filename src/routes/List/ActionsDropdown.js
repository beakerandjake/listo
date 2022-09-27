import {
  faCheck,
  faGear,
  faRotateLeft,
  faTrashCheck,
  faTriangleExclamation,
} from '@fortawesome/pro-regular-svg-icons';
import {
  EllipsisMenuTrigger,
  MenuHeader,
  MenuItem,
  MenuSeparator,
  MenuTitle,
  ResponsiveMenu,
  ScrollableMenuContent,
  StatefulMenu,
} from 'components/Menu';
import { Link } from 'react-router-dom';

/**
 * Dropdown menu which contains list wide actions.
 * @param {Object} props - The props.
 * @param {Array} props.items - The items of the list.
 * @param {function} props.onSetItemsCompleted - Callback invoked when the user wants to mark all items of the list as completed.
 * @param {function} props.onDeleteItems - Callback invoked when the user wants to delete all of the items in the list.
 */
export function ActionsDropdown({ items, onSetItemsCompleted, onDeleteItems }) {
  return (
    <StatefulMenu>
      {({ open, setOpen }) => (
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
                    onSetItemsCompleted(
                      items.filter((x) => !x.completed).map((x) => x.id),
                      true
                    );
                  }}
                />
                <MenuItem
                  icon={faRotateLeft}
                  label="Mark All Items Active"
                  disabled={items.every((x) => !x.completed)}
                  onClick={() => {
                    setOpen(false);
                    onSetItemsCompleted(
                      items.filter((x) => x.completed).map((x) => x.id),
                      false
                    );
                  }}
                />
                <MenuSeparator />
                <MenuItem
                  icon={faTrashCheck}
                  variant="warning"
                  label="Delete Complete Items"
                  disabled={items.every((x) => !x.completed)}
                  onClick={() => {
                    setOpen(false);
                    onDeleteItems(
                      items.filter((x) => x.completed).map((x) => x.id),
                      {
                        title: 'Delete Completed Items?',
                        message:
                          'All Completed Items in this list will be permanently deleted.',
                      }
                    );
                  }}
                />
                <MenuItem
                  icon={faTriangleExclamation}
                  variant="danger"
                  label="Delete All Items"
                  disabled={items.length < 1}
                  onClick={() => {
                    setOpen(false);
                    onDeleteItems(
                      items.map((x) => x.id),
                      {
                        title: 'Delete All Items?',
                        message:
                          'All Items in this list will be permanently deleted.',
                      }
                    );
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
      )}
    </StatefulMenu>
  );
}
