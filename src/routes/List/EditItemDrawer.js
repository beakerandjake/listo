import { useState, useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {
  faArrowLeft,
  faArrowRightFromBracket,
  faTrashCan,
} from '@fortawesome/pro-solid-svg-icons';
import { DebounceInput } from 'react-debounce-input';
import { Drawer } from 'components/Drawer';
import {
  MenuFooter,
  MenuHeader,
  MenuTitle,
  ScrollableMenuContent,
} from 'components/Menu';
import { IconButton } from 'components/IconButton';
import {
  ItemCompletedCheckbox,
  ItemDueDateMenu,
  ItemNameLabel,
  ItemQuantityMenu,
} from 'routes/List/Item';

/**
 * Drawer which allows the user to edit fields of an Item.
 * @param {Object} props
 * @param {Object} props.item - The item which can be edited.
 * @param {function} props.onClose - Callback invoked when the drawer is to be closed.
 * @param {function} props.onEditItem - Callback invoked when the user edits a field of the item.
 * @param {function} props.onDeleteItem - Callback invoked when the user wants to delete the item.
 */
export function EditItemDrawer({ item, onClose, onEditItem, onDeleteItem }) {
  const [open, setOpen] = useState(false);

  // open the drawer when an item is provided.
  useEffect(() => {
    setOpen(!!item);
  }, [item]);

  if (!item) {
    return null;
  }

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      onExitTransitionComplete={() => onClose()}
      anchor="right"
      size="full"
      contentClassName="max-w-md"
    >
      <MenuHeader className="flex items-center gap-3 md:p-4">
        <IconButton
          icon={faArrowLeft}
          title="Close Item Details"
          onClick={() => setOpen(false)}
        />
        <MenuTitle title="">Item Details</MenuTitle>
      </MenuHeader>
      <ScrollableMenuContent className="flex flex-col py-6 px-4 sm:px-6 gap-6 bg-gray-50">
        {/* Item Name / Checkbox */}
        <div className="flex items-center">
          <div className="-ml-2">
            <ItemCompletedCheckbox
              checked={item.completed}
              onChange={(completed) => onEditItem(item.id, { completed })}
            />
          </div>
          <ItemNameLabel
            completed={item.completed}
            name={item.name}
            className="text-2xl font-medium text-gray-900 cursor-pointer select-none"
            onClick={() => onEditItem(item.id, { completed: !item.completed })}
          />
        </div>
        {/* Edit Item Fields */}
        <div className="flex flex-col space-y-2">
          <ItemQuantityMenu
            quantity={item.quantity}
            onChange={(value) => onEditItem(item.id, { quantity: value })}
            onReset={(value) => onEditItem(item.id, { quantity: value })}
            desktopPlacement="bottom"
          />
          <ItemDueDateMenu
            dueDate={item.dueDate}
            onChange={(value) => onEditItem(item.id, { dueDate: value })}
            desktopPlacement="bottom"
          />

          <DebounceInput
            element="textarea"
            value={item.note}
            onChange={(event) =>
              onEditItem(item.id, { note: event.target.value })
            }
            debounceTimeout={800}
            forceNotifyByEnter={false}
            placeholder="Add Note"
            className="self-stretch rounded border border-gray-300"
            rows={3}
            title="Change Note"
          />
        </div>
      </ScrollableMenuContent>
      <MenuFooter className="flex items-center justify-between">
        <IconButton
          icon={faArrowRightFromBracket}
          title="Close Item Details"
          onClick={() => setOpen(false)}
        />
        {item.created && (
          <span className="text-sm font-semibold text-gray-500 select-none">
            Created{' '}
            {formatDistanceToNow(parseISO(item.created), { addSuffix: true })}
          </span>
        )}
        <IconButton
          icon={faTrashCan}
          title="Delete Item"
          onClick={onDeleteItem}
        />
      </MenuFooter>
    </Drawer>
  );
}
