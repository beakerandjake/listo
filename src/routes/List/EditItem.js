import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRightFromBracket, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from 'components/IconButton';
import { ConfirmDeleteItem } from './ConfirmDeleteItem';
import { CompletedCheckbox } from './Item/CompletedCheckbox';
import { format } from 'timeago.js'
import { NameLabel } from './Item/NameLabel';

export function EditItem(props) {
    const [open, setOpen] = useState(false);
    const [cachedItem, setCachedItem] = useState({});

    // any time our item changes, update our current state.
    useEffect(() => {
        if (!props.item) {
            setOpen(false);
        } else {
            setCachedItem(props.item);
            setOpen(true);
        }
    }, [props.item]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={props.onClose}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                {/* Main content */}
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
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
                                                        onChange={completed => props.onSetItemCompleted(props.id, completed)}
                                                    />
                                                </div>
                                                <span className="text-lg font-medium text-gray-900">
                                                    <NameLabel completed={cachedItem.completed} name={cachedItem.name} />
                                                </span>
                                            </div>
                                            <div className="relative mt-6 flex-1">
                                                {/* Replace with your content */}
                                                <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
                                                {/* /End replace */}
                                            </div>
                                        </div>
                                        {/* Footer */}
                                        <div className="flex flex-shrink-0 justify-between items-center px-4 py-4">
                                            <IconButton icon={faArrowRightFromBracket} title="Close Details" onClick={props.onClose} />
                                            <h3 className="text-sm font-semibold text-gray-500 select-none">
                                                Created {format(cachedItem.created)}
                                            </h3>
                                            <ConfirmDeleteItem onConfirmDelete={props.onDeleteItem} />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}