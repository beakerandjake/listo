import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconButton } from "components/IconButton";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/Button";

export function ConfirmDelete(props) {
    const [confirming, setConfirming] = useState(false);

    const onConfirmDelete = () => {
        setConfirming(false);
        props.onConfirmDelete();
    }

    return (
        <>
            {/* Delete Button, clicking opens the confirm modal. */}
            <IconButton icon={faTrashCan} title="Delete Item" onClick={() => setConfirming(true)} />

            {/* Show confirm modal if user clicks delete button. */}
            <Transition show={confirming} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setConfirming(false)}>
                    {/* Overlay */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
                    </Transition.Child>

                    {/* Modal body */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        {/* full screen centering container. */}
                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4">
                                <Dialog.Title className="text-lg font-medium">Delete Item?</Dialog.Title>
                                <Dialog.Description className="text-md text-gray-500">
                                    This item will be permanently deleted.
                                </Dialog.Description>
                                <div className="flex justify-end items-center gap-2 mt-4">
                                    <Button text="Cancel" onClick={() => setConfirming(false)} />
                                    <Button text="Delete" type="danger" onClick={onConfirmDelete} />
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    )
}