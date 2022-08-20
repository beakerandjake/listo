import { useState, useLayoutEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { faArrowLeft, faArrowRightFromBracket, faPlusMinus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { DebounceInput } from "react-debounce-input";
import { Drawer } from 'components/Drawer';
import { IconButton } from 'components/IconButton';
import { CompletedCheckbox } from '../Item';
import { NameLabel } from '../Item';
import { EditDueDate } from './EditDueDate';
import {
    MenuFooter,
    MenuHeader,
    MenuTitle,
    ScrollableMenuContent
} from 'components/Menu';
import { SetQuantityMenu } from '../Item/SetQuantityMenu';
import { ItemFieldMenuButton } from './ItemFieldMenuButton';



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

    return (
        <Drawer open={open} onClose={onClose}>
            <MenuHeader className="flex items-center gap-3 md:p-4">
                <IconButton icon={faArrowLeft} title="Close Item Details" onClick={() => onClose()} />
                <MenuTitle title="">Item Details</MenuTitle>
            </MenuHeader>
            <ScrollableMenuContent className="flex flex-col py-6 px-4 sm:px-6 gap-6 bg-gray-50">
                {/* Item Name / Checkbox */}
                <div className="flex items-center">
                    <div className="-ml-2">
                        <CompletedCheckbox
                            checked={cachedItem.completed}
                            onChange={completed => onEditItem(cachedItem.id, { completed })}
                        />
                    </div>
                    <NameLabel
                        completed={cachedItem.completed}
                        name={cachedItem.name}
                        className="text-lg sm:text-lg font-semibold text-gray-900"
                    />
                </div>
                {/* Edit Item Fields */}
                <div className="flex flex-col space-y-2">
                    <SetQuantityMenu
                        quantity={cachedItem.quantity}
                        onChange={value => onEditItem(cachedItem.id, { quantity: value })}
                        onReset={value => onEditItem(cachedItem.id, { quantity: value })}
                        trigger={(
                            <ItemFieldMenuButton
                                icon={faPlusMinus}
                                placeholder="Change Quantity"
                                clearButtonTitle="Reset Quantity"
                                onClearValue={() => onEditItem(cachedItem.id, { quantity: 1 })}
                                variant={cachedItem.quantity > 1 ? 'success' : 'default'}
                            >
                                {cachedItem.quantity > 1 && (
                                    <span>Quantity: {cachedItem.quantity}</span>
                                )}
                            </ItemFieldMenuButton>
                        )}
                        desktopPlacement='bottom'
                        desktopOffset={1}
                    />

                    <EditDueDate
                        dueDate={cachedItem.dueDate}
                        onChange={value => onEditItem(cachedItem.id, { dueDate: value })}
                    />
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
            </ScrollableMenuContent>
            <MenuFooter className="flex items-center justify-between">
                <IconButton icon={faArrowRightFromBracket} title="Close Item Details" onClick={() => onClose()} />
                {cachedItem.created && (
                    <span className="text-sm font-semibold text-gray-500 select-none">
                        Created {formatDistanceToNow(parseISO(cachedItem.created), { addSuffix: true })}
                    </span>
                )}
                <IconButton icon={faTrashCan} title="Delete Item" onClick={onDeleteItem} />
            </MenuFooter>
        </Drawer >
    )
}