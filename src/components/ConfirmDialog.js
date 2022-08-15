import * as Dialog from '@radix-ui/react-dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "components/Button";

export function ConfirmDialog(props) {
    return (
        <Dialog.Root open={props.open} onOpenChange={(open) => !open && props.onDismiss()}>
            <Dialog.Portal>
                <Dialog.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
                <div className="fixed z-20 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Dialog.Content className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                            {/* Main Content */}
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        <Dialog.Title className="text-xl leading-6 font-medium text-gray-900">
                                            {props.title}
                                        </Dialog.Title>
                                        <Dialog.Description className="mt-3 sm:mt-2 text-sm text-gray-500">
                                            {props.message}
                                        </Dialog.Description>
                                    </div>
                                </div>
                            </div>
                            {/* Footer */}
                            <div className="bg-gray-50 px-4 py-3 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-2">
                                <Button
                                    text={props.cancelButtonText || "Cancel"}
                                    className="w-full sm:w-auto text-base font-medium sm:text-sm"
                                    onClick={props.onDismiss}
                                />
                                <Button
                                    text={props.confirmButtonText}
                                    variant={props.variant}
                                    className="w-full sm:w-auto text-base font-medium sm:text-sm"
                                    onClick={props.onConfirm}
                                />
                            </div>
                            <div className="absolute top-3 right-3">
                                <Dialog.Close className="flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full w-5 h-5">
                                    <FontAwesomeIcon icon={faTimes} />
                                </Dialog.Close>
                            </div>
                        </Dialog.Content>
                    </div>
                </div>
            </Dialog.Portal >
        </Dialog.Root >

    )
}