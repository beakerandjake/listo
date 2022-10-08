import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {
  faArrowLeft,
  faArrowRightFromBracket,
} from '@fortawesome/pro-solid-svg-icons';
import { DebounceInput } from 'react-debounce-input';
import { itemApi } from 'api';
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
import {
  listItemsActions,
  useListItemsDispatch,
} from 'context/ListItemsContext';
import { ItemCreatedDate } from './ItemCreatedDate';

/**
 * Drawer which allows the user to edit fields of an Item.
 * @param {Object} props
 * @param {Object} props.item - The item which can be edited.
 * @param {function} props.onClosed - Callback invoked when the drawer closed.
 */
export function EditItemDrawer({ item, onClosed }) {
  const [open, setOpen] = useState(true);
  const dispatch = useListItemsDispatch();
  const handleError = useErrorHandler();

  /**
   * Edit the item.
   * @param {number} itemId - The id of the item to edit.
   * @param {object} changes - The changes to apply to the item.
   **/
  const editItem = async (changes) =>
    itemApi
      .editItem(item.id, changes)
      .then((newItem) =>
        dispatch({ type: listItemsActions.edit, item: newItem })
      )
      .catch(handleError);

  return (
    <>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        onExitTransitionComplete={() => onClosed()}
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
                  onChange={(completed) => editItem({ completed })}
                />
              </div>
              <ItemNameLabel
                completed={item.completed}
                name={item.name}
                className="text-2xl font-medium text-gray-900 cursor-pointer select-none"
                onClick={() => editItem({ completed: !item.completed })}
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
              onChange={(value) => editItem({ quantity: value })}
              onReset={(value) => editItem({ quantity: value })}
              desktopPlacement="bottom"
            />
            <ItemDueDateMenu
              dueDate={item.dueDate}
              onChange={(value) => editItem({ dueDate: value })}
              desktopPlacement="bottom"
            />
            <DebounceInput
              element="textarea"
              value={item.note}
              onChange={(event) => editItem({ note: event.target.value })}
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
          <ItemCreatedDate createdDate={item.createdDate} />
          <DeleteItem itemId={item.id} />
        </MenuFooter>
      </Drawer>
    </>
  );
}
