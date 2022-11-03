import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
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
import { ItemNameLabel, ItemCompletedCheckbox } from 'components/Item';
import {
  ItemDueDateMenu,
  ItemFormattedDateLabel,
  ItemQuantityMenu,
} from 'routes/List/Item';
import { DeleteItem } from './DeleteItem';
import {
  listItemsActions,
  useListItemsDispatch,
} from 'context/ListItemsContext';

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
                size="lg"
                className="font-medium text-gray-900 cursor-pointer select-none"
                onClick={() => editItem({ completed: !item.completed })}
              />
            </div>
            <ItemFormattedDateLabel
              date={item.completedDate}
              prefix="Completed"
              className="text-xs font-semibold text-gray-500 select-none"
            />
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
          <ItemFormattedDateLabel
            date={item.createdDate}
            prefix="Created"
            className="text-sm font-semibold text-gray-500 select-none"
          />
          <DeleteItem itemId={item.id} />
        </MenuFooter>
      </Drawer>
    </>
  );
}
