import { useState, useEffect, useLayoutEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { faArrowLeft, faArrowRightFromBracket, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { DebounceInput } from "react-debounce-input";
import { Drawer } from 'components/Drawer';
import { MenuFooter, MenuHeader, MenuTitle } from 'components/Menu';
import { IconButton } from 'components/IconButton';
import { CompletedCheckbox } from '../Item';
import { NameLabel } from '../Item';
import { EditDueDate } from './EditDueDate';
import { EditQuantity } from './EditQuantity';



/**
 * Drawer which allows the user to edit fields of an Item.
 * @param {Object} props
 * @param {Object} props.item - The item which can be edited.
 * @param {function} props.onClose - Callback invoked when the drawer is to be closed. 
 * @param {function} props.onEditItem - Callback invoked when the user edits a field of the item. 
 * @param {function} props.onDeleteItem - Callback invoked when the user wants to delete the item. 
 */
export function EditItem({
    item,
    onClose,
    onEditItem,
    onDeleteItem
}) {
    const [open, setOpen] = useState(false);
    const [dueDateMenuOpen, setDueDateMenuOpen] = useState(false);
    const [cachedItem, setCachedItem] = useState({});

    // any time our item changes, update our current state.
    // when the item is set, we will display the drawer
    // when the item is cleared, close the drawer but keep 
    // a reference to the cached item, that way we can still display
    // our contents as the close animation is happening.
    useLayoutEffect(() => {
        if (!item) {
            setOpen(false);
        } else {
            setCachedItem(item);
            setOpen(true);
        }
    }, [item]);

    // Close all menus when we are closed
    useEffect(() => {
        if (!open) {
            setDueDateMenuOpen(false);
        }
    }, [open]);

    return (
        <Drawer open={open} onClose={onClose}>
            <div className="h-full flex flex-col justify-between">
                {/* Header */}
                <MenuHeader className="flex items-center gap-3 md:p-4">
                    <IconButton icon={faArrowLeft} title="Close Item Details" onClick={() => onClose()} />
                    <MenuTitle title="">Item Details</MenuTitle>
                </MenuHeader>
                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-y-scroll py-6 px-4 sm:px-6 gap-6 bg-gray-50">
                    {/* Item Name / Checkbox */}
                    <div className="flex items-center">
                        <div className="-ml-2">
                            <CompletedCheckbox
                                checked={cachedItem.completed}
                                onChange={completed => onEditItem(cachedItem.id, { completed })}
                            />
                        </div>
                        <NameLabel completed={cachedItem.completed} name={cachedItem.name} className="text-lg sm:text-lg font-semibold text-gray-900" />
                    </div>
                    {/* Edit Item Fields */}
                    <div className="flex flex-col space-y-2">
                        <EditQuantity quantity={cachedItem.quantity} onChange={value => onEditItem(cachedItem.id, { quantity: value })} />
                        <EditDueDate dueDate={cachedItem.dueDate} onChange={value => onEditItem(cachedItem.id, { dueDate: value })} />
                        <DebounceInput
                            element="textarea"
                            value={cachedItem.note}
                            onChange={event => onEditItem(cachedItem.id, { note: event.target.value })}
                            debounceTimeout={800}
                            forceNotifyByEnter={false}
                            placeholder="Add Note"
                            className="self-stretch rounded border border-gray-300"
                            rows={3}
                        />
                    </div>
                </div>
                {/* Footer */}
                <MenuFooter className="flex items-center justify-between">
                    <IconButton icon={faArrowRightFromBracket} title="Close Item Details" onClick={() => onClose()} />
                    {cachedItem.created && (
                        <span className="text-sm font-semibold text-gray-500 select-none">
                            Created {formatDistanceToNow(parseISO(cachedItem.created), { addSuffix: true })}
                        </span>
                    )}
                    <IconButton icon={faTrashCan} title="Delete Item" onClick={onDeleteItem} />
                </MenuFooter>
            </div >
        </Drawer >
    )
}