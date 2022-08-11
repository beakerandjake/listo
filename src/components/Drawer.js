import { useRef } from 'react';
import cx from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const DrawerClose = Dialog.Close;

const SIZES = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    full: 'full'
};

const ANCHORS = {
    left: 'left',
    right: 'right',
    bottom: 'bottom'
};

const SIZE_STYLES = [
    // HORIZONTAL ANCHORS
    {
        size: SIZES.xs,
        anchors: [ANCHORS.left, ANCHORS.right],
        className: 'w-full max-w-xs'
    },
    {
        size: SIZES.sm,
        anchors: [ANCHORS.left, ANCHORS.right],
        className: 'w-full max-w-sm'
    },
    {
        size: SIZES.md,
        anchors: [ANCHORS.left, ANCHORS.right],
        className: 'w-full max-w-md'
    },
    {
        size: SIZES.lg,
        anchors: [ANCHORS.left, ANCHORS.right],
        className: 'w-full max-w-lg'
    },
    {
        size: SIZES.xl,
        anchors: [ANCHORS.left, ANCHORS.right],
        className: 'w-full max-w-xl'
    },
    {
        size: SIZES.full,
        anchors: [ANCHORS.left, ANCHORS.right],
        className: 'w-full'
    },
    // HORIZONTAL ANCHORS
    {
        size: SIZES.xs,
        anchors: [ANCHORS.bottom],
        className: 'h-1/6'
    },
    {
        size: SIZES.sm,
        anchors: [ANCHORS.bottom],
        className: 'h-2/6'
    },
    {
        size: SIZES.md,
        anchors: [ANCHORS.bottom],
        className: 'h-3/6'
    },
    {
        size: SIZES.lg,
        anchors: [ANCHORS.bottom],
        className: 'h-4/6'
    },
    {
        size: SIZES.xl,
        anchors: [ANCHORS.bottom],
        className: 'h-5/6'
    },
    {
        size: SIZES.full,
        anchors: [ANCHORS.bottom],
        className: 'h-full'
    }
];

const ANCHOR_STYLES = [
    {
        anchor: ANCHORS.left,
        className: 'inset-y-0 left-0'
    },
    {
        anchor: ANCHORS.right,
        className: 'inset-y-0 right-0'
    },
    {
        anchor: ANCHORS.bottom,
        className: 'inset-x-0 bottom-0'
    },
]

const CLOSE_BUTTON_ANCHOR_STYLES = [
    {
        anchor: ANCHORS.right,
        className: 'top-3 right-3'
    },
    {
        anchor: ANCHORS.left,
        className: 'top-3 left-3'
    }
];

const CLOSE_BUTTON_DEFAULT_ICON = faTimes;

function invalidProp(message) {
    throw new Error(message);
}

function DefaultCloseButton({ anchor, icon, title }) {
    const anchorStyle = CLOSE_BUTTON_ANCHOR_STYLES.find(x => x.anchor === anchor)?.className || invalidProp(`Unsupported anchor for close button: '${anchor}'`);

    return (
        <DrawerClose
            className={cx(
                'absolute w-5 h-5 rounded-full flex items-center justify-center',
                'text-gray-500 enabled:hover:text-gray-700 keyboard-only-focus-ring',
                anchorStyle
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
 * @param {'right'|'left'|'bottom'=} props.anchor - The side of the viewport that the Drawer is anchored to. 
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'full'=} props.size - How much of the viewport should the drawer take up? 
 * @param {boolean=} props.showCloseButton - Should a default show button be rendered?
 * @param {'left'|'right'=} props.closeButtonAnchor - The side of the drawer that the default show button will be anchored to.
 * @param {IconDefinition=}  props.closeButtonIcon - The FontAwesomeIcon of the default show button.
 * @param {string}  props.closeButtonTitle - The text to display on close button hover.
 */
export function Drawer({
    open = false,
    onClose,
    anchor = ANCHORS.right,
    size = SIZES.md,
    showCloseButton = false,
    closeButtonAnchor = ANCHORS.right,
    closeButtonIcon = CLOSE_BUTTON_DEFAULT_ICON,
    closeButtonTitle = 'Close',
    children
}, z) {
    const drawerRef = useRef(null);
    const anchorStyle = ANCHOR_STYLES.find(x => x.anchor === anchor)?.className || invalidProp(`Unsupported anchor: '${anchor}'`);
    const sizeStyle = SIZE_STYLES.find(x => x.size === size && x.anchors.includes(anchor))?.className || invalidProp(`Unsupported size: '${size}'`);

    return (
        <Dialog.Root open={open} onOpenChange={open => !open && onClose()}>
            <Dialog.Portal className="z-10">
                <Dialog.Overlay className="z-10 fixed inset-0 bg-black bg-opacity-50 transition-opacity" tabIndex={-1} />
                <Dialog.Content
                    className={cx(sizeStyle, anchorStyle, "z-10 fixed shadow-xl bg-white focus:outline-none")}
                    onOpenAutoFocus={e => {
                        e.preventDefault();
                        drawerRef.current.focus();
                    }}
                    ref={drawerRef}
                >
                    {children}
                    {!!showCloseButton && DefaultCloseButton({ anchor: closeButtonAnchor, icon: closeButtonIcon, title: closeButtonTitle })}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root >
    );
}

/**
 * Styled Title for the Drawer.
 * @param {Object} props
 * @param {string} props.title - The title to display.
 * @param {string} props.className - Additional styles to apply to the title. 
 */
export function DrawerTitle({ title, className }) {
    return (
        <Dialog.Title className={cx('text-md font-semibold text-gray-500 select-none truncate', className)}>
            {title}
        </Dialog.Title>
    )
}

/**
 * Styled container for a Drawer Header.
 * @param {Object} props
 * @param {string} props.className - Additional styles to apply to the header. 
 * @param {React.ReactNode} props.children - The content of the header.
 */
export function DrawerHeader({ className, children }) {
    return (
        <div className={cx('shrink-0 p-4 bg-white drop-shadow border-b border-gray-300', className)}>
            {children}
        </div>
    )
}

/**
 * Styled container for a Drawer Footer.
 * @param {Object} props
 * @param {string} props.className - Additional styles to apply to the footer. 
 * @param {React.ReactNode} props.children - The content of the footer.
 */
export function DrawerFooter({ className, children }) {
    return (
        <div className={cx('shrink-0 p-4 bg-white border-t border-gray-300', className)}>
            {children}
        </div>
    )
}