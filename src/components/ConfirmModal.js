import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "components/Button";

export function ConfirmModal(props) {
    const cancelButtonRef = useRef(null);


    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={props.onDismiss} initialFocus={cancelButtonRef}>
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
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all" >
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                                        {props.title}
                                    </Dialog.Title>
                                    <Dialog.Description className="text-sm text-gray-500 mt-2">
                                        {props.message}
                                    </Dialog.Description>
                                </div>
                                <div className="flex justify-end items-center gap-2 bg-gray-50 px-4 py-3">
                                    <Button text={props.cancelButtonText || "Cancel"} onClick={props.onDismiss} />
                                    <Button text={props.confirmButtonText} variant={props.variant} onClick={props.onConfirm} ref={cancelButtonRef} />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}