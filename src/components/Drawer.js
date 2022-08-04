import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Dialog from '@radix-ui/react-dialog';

export const DrawerTitle = Dialog.Title;
export const DrawerClose = Dialog.Close;

export function DrawerCloseIconButton(props) {
    return (
        <DrawerClose title={props.title}>
            <FontAwesomeIcon icon={props.icon} className="text-gray-500 hover:text-gray-700" />
        </DrawerClose>
    )
}

export function Drawer(props) {
    return (
        <Dialog.Root open={props.open} onOpenChange={open => !open && props.onClose()}>
            <Dialog.Portal className="z-10">
                <Dialog.Overlay className="z-10 fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
                <Dialog.Content className="z-10 fixed inset-y-0 right-0 w-screen max-w-md shadow-xl bg-white" onOpenAutoFocus={e => e.preventDefault()}>
                    {props.children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}