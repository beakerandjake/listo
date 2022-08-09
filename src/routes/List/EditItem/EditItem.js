import { useState, useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { faArrowLeft, faArrowRightFromBracket, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from 'components/IconButton';
import { CompletedCheckbox } from '../Item/CompletedCheckbox';
import { NameLabel } from '../Item/NameLabel';
import { QuantityButton } from '../Item/QuantityButton';
import { EditItemField } from './EditItemField';
import { DebounceInput } from "react-debounce-input";
import { DueDateStatus } from '../Item/DueDateStatus';
import { DueDatePicker } from './DueDatePicker';
import {
    Drawer,
    DrawerTitle,
    DrawerClose
} from 'components/Drawer';


export function EditItem(props) {
    const [open, setOpen] = useState(false);
    const [cachedItem, setCachedItem] = useState({});

    // any time our item changes, update our current state.
    // when the item is set, we will display the drawer
    // when the item is cleared, close the drawer but keep 
    // a reference to the cached item, that way we can still display
    // our contents as the close animation is happening.
    useEffect(() => {
        if (!props.item) {
            setOpen(false);
        } else {
            setCachedItem(props.item);
            setOpen(true);
        }
    }, [props.item]);

    return (
        <Drawer open={open} onClose={props.onClose}>
            <div className="flex flex-col h-full divide-y divide-gray-200">
                {/* Header */}
                <div className="bg-white p-4 flex items-center gap-3">
                    <DrawerClose asChild>
                        <IconButton icon={faArrowLeft} title="Close Item Details"/>
                    </DrawerClose>
                    <DrawerTitle className="text-md font-semibold text-gray-500 select-none">Item Details</DrawerTitle>
                </div>
                {/* Body */}
                <div className="flex flex-1 flex-col overflow-y-scroll py-6 px-4 sm:px-6 gap-6 bg-gray-50">
                    {/* Name Label */}
                    <div className="flex items-center">
                        <div className="-ml-2">
                            <CompletedCheckbox
                                checked={cachedItem.completed}
                                onChange={completed => props.onEditItem(cachedItem.id, { completed })}
                            />
                        </div>
                        <NameLabel completed={cachedItem.completed} name={cachedItem.name} className="text-lg sm:text-lg font-semibold text-gray-900" />
                    </div>
                    {/* Item form */}
                    <div className="flex flex-col space-y-6">
                        <EditItemField label="Quantity">
                            <QuantityButton
                                quantity={cachedItem.quantity}
                                onQuantityChange={quantity => props.onEditItem(cachedItem.id, { quantity })}
                            />
                        </EditItemField>

                        <EditItemField label="Due Date">
                            <DueDatePicker
                                date={cachedItem.dueDate}
                                onChange={date => props.onEditItem(cachedItem.id, { dueDate: date })}
                            />
                            <DueDateStatus dueDate={cachedItem.dueDate} />
                        </EditItemField>

                        <EditItemField>
                            <DebounceInput
                                element="textarea"
                                value={cachedItem.note}
                                onChange={event => props.onEditItem(cachedItem.id, { note: event.target.value })}
                                debounceTimeout={800}
                                forceNotifyByEnter={false}
                                placeholder="Add Note"
                                className="border-gray-200 self-stretch"
                                rows={3}
                            />
                        </EditItemField>
                    </div>
                </div >
                {/* Footer */}
                < div className="flex flex-grow-0 flex-shrink-0 justify-between items-center px-4 py-4" >
                    <DrawerClose asChild>
                        <IconButton icon={faArrowRightFromBracket} title="Close Item Details" />
                    </DrawerClose>
                    {cachedItem.created && (
                        <span className="text-sm font-semibold text-gray-500 select-none">
                            Created {formatDistanceToNow(parseISO(cachedItem.created), { addSuffix: true })}
                        </span>
                    )}
                    <IconButton icon={faTrashCan} title="Delete Item" onClick={props.onDeleteItem} />
                </div >
            </div>
        </Drawer >
    )
}