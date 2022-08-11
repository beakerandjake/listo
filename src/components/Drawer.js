import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Dialog from '@radix-ui/react-dialog';
import cx from 'classnames';
import { forwardRef, useRef } from 'react';

export const DrawerTitle = Dialog.Title;
export const DrawerClose = Dialog.Close;

const orientations = {
    v: 'vertical',
    h: 'horizontal'
};

const sizes = {
    vertical: {
        md: 'max-w-md',
        sm: 'max-w-sm',
        lg: 'max-w-lg',
        xs: 'max-w-xs'
    },
    horizontal: {
        sm: 'h-1/3',
        md: 'h-1/2',
        lg: 'h-2/3',
        xs: 'h-1/4',
        full: 'h-full',
    }
}

const sides = {
    left: 'inset-y-0 left-0',
    right: 'inset-y-0 right-0',
    bottom: 'inset-x-0 bottom-0'
}

export function Drawer(props) {
    const drawerRef = useRef(null);

    const side = sides[props.side] || sides.right;
    const orientation = [sides.left, sides.right].includes(side) ? orientations.v : orientations.h;
    const size = sizes[orientation][props.size] || sizes[orientation].md;

    return (
        <Dialog.Root open={props.open} onOpenChange={open => !open && props.onClose()}>
            <Dialog.Portal className="z-10">
                <Dialog.Overlay className="z-10 fixed inset-0 bg-black bg-opacity-50 transition-opacity" tabIndex={-1} />
                <Dialog.Content
                    className={cx(size, side, "z-10 fixed w-screen shadow-xl bg-white focus:outline-none")}
                    onOpenAutoFocus={e => {
                        e.preventDefault();
                        drawerRef.current.focus();
                    }}
                    ref={drawerRef}
                >
                    {props.children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    );
}