import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { faArrowLeft, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from 'components/IconButton';
import { ConfirmDeleteItem } from '../ConfirmDeleteItem';
import { CompletedCheckbox } from '../Item/CompletedCheckbox';
import { NameLabel } from '../Item/NameLabel';
import { Drawer } from 'components/Drawer';
import { QuantityButton } from '../Item/QuantityButton';
import { EditItemField } from './EditItemField';
import { DebounceInput } from "react-debounce-input";
import { FormattedDate } from "components/FormattedDate";
import { DueDateStatus } from '../Item/DueDateStatus';
import { DueDatePicker } from './DueDatePicker';


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
        <Drawer open={open} onClose={props.onClose} >
            {/* Header */}
            <div className="bg-white p-4 flex items-center gap-3">
                <IconButton icon={faArrowLeft} className="text-gray-500 hover:text-gray-700" onClick={props.onClose} />
                <Dialog.Title className="text-lg font-medium">Item Details</Dialog.Title>
            </div>
            {/* Body */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6 px-4 sm:px-6 gap-6 bg-gray-50">
                {/* Name Label */}
                <div className="flex items-center">
                    <div className="-ml-2">
                        <CompletedCheckbox
                            checked={cachedItem.completed}
                            onChange={completed => props.onEditItem(cachedItem.id, { completed })}
                        />
                    </div>
                    <NameLabel completed={cachedItem.completed} name={cachedItem.name} className="text-md sm:text-lg font-medium text-gray-900" />
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
                        <DueDateStatus dueDate={cachedItem.dueDate} />
                        <DueDatePicker
                            date={cachedItem.dueDate}
                            onChange={date => props.onEditItem(cachedItem.id, { dueDate: date })}
                        />
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
            < div className="flex flex-shrink-0 justify-between items-center px-4 py-4" >
                <IconButton icon={faArrowRightFromBracket} title="Close Details" onClick={props.onClose} />
                <FormattedDate date={cachedItem.created} className="text-sm font-semibold text-gray-500 select-none" prefix="Created" />
                <ConfirmDeleteItem onConfirmDelete={props.onDeleteItem} />
            </div >
        </Drawer >
    )
}