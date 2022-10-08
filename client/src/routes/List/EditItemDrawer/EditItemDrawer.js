import { useState, useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {
  faArrowLeft,
  faArrowRightFromBracket,
} from '@fortawesome/pro-solid-svg-icons';
import { DebounceInput } from 'react-debounce-input';
import { Drawer } from 'components/Drawer';
import { IconButton } from 'components/IconButton';
import {
  MenuFooter,
  MenuHeader,
  MenuTitle,
  ScrollableMenuContent,
} from 'components/Menu';
import {
  ItemCompletedCheckbox,
  ItemDueDateMenu,
  ItemNameLabel,
  ItemQuantityMenu,
} from 'routes/List/Item';
import { DeleteItem } from './DeleteItem';

/**
 * Drawer which allows the user to edit fields of an Item.
 * @param {Object} props
 * @param {Object} props.item - The item which can be edited.
 * @param {function} props.onClose - Callback invoked when the drawer is to be closed.
 * @param {function} props.onEditItem - Callback invoked when the user edits a field of the item.
 */
export function EditItemDrawer({ item, onClose, onEditItem }) {
  const [open, setOpen] = useState(false);

  // open the drawer when an item is provided.
  useEffect(() => {
    setOpen(!!item);
  }, [item]);

  if (!item) {
    return null;
  }

  return (
    <>
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
        <ScrollableMenuContent className="flex flex-col py-6 px-4 sm:px-6 gap-3 bg-gray-50">
          {/* Item Name / Checkbox */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="-ml-2">
                <ItemCompletedCheckbox
                  checked={item.completed}
                  onChange={(completed) => onEditItem({ completed })}
                />
              </div>
              <ItemNameLabel
                completed={item.completed}
                name={item.name}
                className="text-2xl font-medium text-gray-900 cursor-pointer select-none"
                onClick={() => onEditItem({ completed: !item.completed })}
              />
            </div>
            {/* Completed date */}
            {item.completedDate && (
              <span className="text-xs font-semibold text-gray-500 select-none">
                Completed{' '}
                {formatDistanceToNow(parseISO(item.completedDate), {
                  addSuffix: true,
                })}
              </span>
            )}
          </div>
          {/* Edit Item Fields */}
          <div className="flex flex-col space-y-2">
            <ItemQuantityMenu
              quantity={item.quantity}
              onChange={(value) => onEditItem({ quantity: value })}
              onReset={(value) => onEditItem({ quantity: value })}
              desktopPlacement="bottom"
            />
            <ItemDueDateMenu
              dueDate={item.dueDate}
              onChange={(value) => onEditItem({ dueDate: value })}
              desktopPlacement="bottom"
            />

            <DebounceInput
              element="textarea"
              value={item.note}
              onChange={(event) => onEditItem({ note: event.target.value })}
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
          {item.createdDate && (
            <span className="text-sm font-semibold text-gray-500 select-none">
              Created{' '}
              {formatDistanceToNow(parseISO(item.createdDate), {
                addSuffix: true,
              })}
            </span>
          )}
          <DeleteItem itemId={item.id} />
        </MenuFooter>
      </Drawer>
    </>
  );
}
