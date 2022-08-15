import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Transition } from '@headlessui/react';
import { Button } from "components/Button";
import { IconButton } from './IconButton';
import {
    Dialog,
    DialogBackdrop,
    DialogContent,
    DialogDescription,
    DialogTitle
} from 'components/Dialog';

export function ConfirmDialog({
    open,
    onDismiss,
    onConfirm,
    title,
    message,
    cancelButtonText,
    confirmButtonText,
    variant,
    children
}) {

    // <Transition.Child
    // enter="transform transition ease-out duration-300"
    // enterFrom="-translate-full"
    // enterTo="translate-y-0"
    // leave="transform transition ease-in duration-200"
    // leaveFrom="translate-y-0"
    // leaveTo="translate-y-full"
    // >

    return (
        <Dialog open={open} onClose={onDismiss} className="z-20">
            <DialogBackdrop />
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <DialogContent className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                        {/* Main Content */}
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <DialogTitle className="text-xl leading-6 font-medium text-gray-900">
                                        {title}
                                    </DialogTitle>
                                    <DialogDescription className="mt-3 sm:mt-2 text-sm text-gray-500">
                                        {message}
                                    </DialogDescription>
                                </div>
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="bg-gray-50 px-4 py-3 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-2">
                            <Button
                                text={cancelButtonText || "Cancel"}
                                className="w-full sm:w-auto text-base font-medium sm:text-sm"
                                onClick={onDismiss}
                            />
                            <Button
                                text={confirmButtonText}
                                variant={variant}
                                className="w-full sm:w-auto text-base font-medium sm:text-sm"
                                onClick={onConfirm}
                            />
                        </div>
                        <div className="absolute top-3 right-3">
                            <IconButton icon={faTimes} onClick={onDismiss} />
                        </div>
                    </DialogContent>
                </div>
            </div>
        </Dialog>
    )
}