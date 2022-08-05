import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Dialog from '@radix-ui/react-dialog';
import cx from 'classnames';

export const DrawerTitle = Dialog.Title;
export const DrawerClose = Dialog.Close;

export function DrawerCloseIconButton(props) {
    return (
        <DrawerClose title={props.title}>
            <FontAwesomeIcon icon={props.icon} className="text-gray-500 hover:text-gray-700" />
        </DrawerClose>
    )
}

const sizes = {
    md: 'max-w-md',
    sm: 'max-w-sm',
    lg: 'max-w-lg',
    xs: 'max-w-xs'
}

const sides = {
    left: 'inset-y-0 left-0',
    right: 'inset-y-0 right-0'
}

export function Drawer(props) {
    const size = sizes[props.size] || sizes.md;
    const side = sides[props.side] || sides.right;

    return (
        <Dialog.Root open={props.open} onOpenChange={open => !open && props.onClose()}>
            <Dialog.Portal className="z-10">
                <Dialog.Overlay className="z-10 fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
                <Dialog.Content
                    className={cx(size, side, "z-10 fixed w-screen shadow-xl bg-white")}
                    onOpenAutoFocus={e => e.preventDefault()}
                >
                    {props.children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    );
}