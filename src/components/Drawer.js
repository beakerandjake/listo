import { useRef } from 'react';
import cx from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const DrawerTitle = Dialog.Title;
export const DrawerClose = Dialog.Close;

const ORIENTATIONS = {
    v: 'vertical',
    h: 'horizontal'
};

const SIZES = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    full: 'full'
}

const SIDES = {
    left: 'left',
    right: 'right',
    bottom: 'bottom'
}

const SIZE_STYLES2 = [
    {
        size: SIZES.xs,
        
        value: ''
    },
    {
        key: SIZES.sm,
        value: ''
    }, {
        key: SIZES.md,
        value: ''
    }, {
        key: SIZES.lg,
        value: ''
    }, {
        key: SIZES.xl,
        value: ''
    },
]

const SIZE_STYLES = {
    vertical: {
        xs: 'w-screen max-w-xs',
        sm: 'w-screen max-w-sm',
        md: 'w-screen max-w-md',
        lg: 'w-screen max-w-lg',
        full: 'w-screen'
    },
    horizontal: {
        xs: 'h-1/4',
        sm: 'h-1/3',
        md: 'h-1/2',
        lg: 'h-2/3',
        xl: 'h-3/4',
        full: 'h-full',
    }
}

const SIDE_STYLES = {
    left: 'inset-y-0 left-0',
    right: 'inset-y-0 right-0',
    bottom: 'inset-x-0 bottom-0'
}

const CLOSE_BUTTON_SIDE_STYLES = {
    right: 'top-3 right-3',
    left: 'top-3 left-3'
};

const CLOSE_BUTTON_DEFAULT_ICON = faTimes;

function invalidProp(message) {
    throw new Error(message);
}

function getOrientation(side) {
    return ['left', 'right'].includes(side) ? ORIENTATIONS.v : ORIENTATIONS.h;
}

/**
 * Sample.
 * @param {Object} props - The Props.
 * @param {'left'|'right'} props.side - The side of the drawer that the close button will appear on.
 */
function DefaultCloseButton({ side, icon, title }) {
    const sideStyle = CLOSE_BUTTON_SIDE_STYLES[side] || invalidProp(`Unsupported closeButtonSide ${side}`);

    return (
        <DrawerClose
            className={cx(
                'absolute w-5 h-5 rounded-full flex items-center justify-center',
                'text-gray-400 hover:text-gray-500 keyboard-only-focus-ring',
                sideStyle
            )}
            title={title}
        >
            <FontAwesomeIcon icon={icon} />
        </DrawerClose>
    );
}

/**
 * Drawer which can contain arbitrary content.
 * @param {Object} props - The Props.
 * @param {boolean} props.open - Should the drawer currently be opened or closed?
 * @param {function} props.onClose - Callback fired when the user requests to close the drawer
 * @param {'right'|'left'|'bottom'=} props.side - The side of the viewport that the Drawer is anchored to. 
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'full'=} props.size - How much of the viewport should the drawer take up? 
 * @param {boolean=} props.showCloseButton - Should a default show button be rendered?
 * @param {'left'|'right'=} props.closeButtonSide - The side of the drawer that the default show button will appear on.
 * @param {IconDefinition=}  props.closeButtonIcon - The FontAwesomeIcon of the default show button.
 * @param {string}  props.closeButtonTitle - The text to display on close button hover.
 */
export function Drawer({
    open = false,
    onClose,
    side = 'right',
    size = 'md',
    showCloseButton = true,
    closeButtonSide = 'right',
    closeButtonIcon = CLOSE_BUTTON_DEFAULT_ICON,
    closeButtonTitle = 'Close',
    children
}, z) {
    const drawerRef = useRef(null);
    const sideStyle = SIDE_STYLES[side] || invalidProp(`Unsupported side: ${side}`);
    const sizeStyle = SIZE_STYLES[getOrientation(side)][size] || invalidProp(`Unsupported size: ${size}`);

    return (
        <Dialog.Root open={open} onOpenChange={open => !open && onClose()}>
            <Dialog.Portal className="z-10">
                <Dialog.Overlay className="z-10 fixed inset-0 bg-black bg-opacity-50 transition-opacity" tabIndex={-1} />
                <Dialog.Content
                    className={cx(sizeStyle, sideStyle, "z-10 fixed shadow-xl bg-white focus:outline-none")}
                    onOpenAutoFocus={e => {
                        e.preventDefault();
                        drawerRef.current.focus();
                    }}
                    ref={drawerRef}
                >
                    {children}
                    {!!showCloseButton && DefaultCloseButton({ side: closeButtonSide, icon: closeButtonIcon, title: closeButtonTitle })}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    );
}
