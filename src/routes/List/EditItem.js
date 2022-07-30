import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRightFromBracket, faCalendar, faCalendarAlt, faPlusMinus } from '@fortawesome/free-solid-svg-icons'
import { format } from 'timeago.js'
import { IconButton } from 'components/IconButton';
import { ConfirmDeleteItem } from './ConfirmDeleteItem';
import { CompletedCheckbox } from './Item/CompletedCheckbox';
import { NameLabel } from './Item/NameLabel';
import { Drawer } from 'components/Drawer';
import QuantityButton2 from 'Old/QuantityButton';


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
                <FontAwesomeIcon icon={faArrowLeft} className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={props.onClose} />
                <Dialog.Title className="text-lg font-medium">Item Details</Dialog.Title>
            </div>
            {/* Body */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6 px-4 sm:px-6 gap bg-gray-50">
                <div className="flex items-center">
                    <div className="-ml-2">
                        <CompletedCheckbox
                            checked={cachedItem.completed}
                            onChange={completed => props.onEditItem(cachedItem.id, { completed })}
                        />
                    </div>
                    <span className="text-lg font-medium text-gray-900">
                        <NameLabel completed={cachedItem.completed} name={cachedItem.name} />
                    </span>
                </div>
                <div className="relative mt-6 flex-1">
                    <form className="space-y-6 sm:space-y-5">
                        <div className="flex flex-col items-start gap-2 border-t border-gray-200 pt-5">
                            <label className="text-sm font-medium text-gray-700">Quantity</label>
                            <div className="flex-grow-0">
                                <QuantityButton2 quantity={cachedItem.quantity} />
                            </div>
                        </div>
                        <div className="flex flex-col items-stretch justify-stretch gap-2 border-t border-gray-200 pt-5">
                            <label className="text-sm font-medium text-gray-700">Due Date</label>
                            <input type="date" className="flex-1" />
                        </div>
                        <div className="border-t border-gray-200 pt-5">
                            <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                defaultValue={''}
                                placeholder="Note"
                            />
                        </div>
                    </form>

                </div>
            </div >
            {/* Footer */}
            < div className="flex flex-shrink-0 justify-between items-center px-4 py-4" >
                <IconButton icon={faArrowRightFromBracket} title="Close Details" onClick={props.onClose} />
                <h3 className="text-sm font-semibold text-gray-500 select-none">
                    Created {format(cachedItem.created)}
                </h3>
                <ConfirmDeleteItem onConfirmDelete={props.onDeleteItem} />
            </div >
        </Drawer >
    )
}