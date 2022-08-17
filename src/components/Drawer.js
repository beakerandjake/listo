import { Fragment } from 'react';
import cx from 'classnames';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Dialog as HeadlessDialog, DialogBackdrop, DialogContent, DialogTitle } from 'components/Dialog';

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
        className: 'min-h-[5%] max-h-[16%]'
    },
    {
        size: SIZES.sm,
        anchors: [ANCHORS.bottom],
        className: 'min-h-[5%] max-h-[33%]'
    },
    {
        size: SIZES.md,
        anchors: [ANCHORS.bottom],
        className: 'min-h-[5%] max-h-[50%]'
    },
    {
        size: SIZES.lg,
        anchors: [ANCHORS.bottom],
        className: 'min-h-[20%] max-h-[66%]'
    },
    {
        size: SIZES.xl,
        anchors: [ANCHORS.bottom],
        className: 'min-h-[5%] max-h-[83%]'
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

const TRANSITION_STYLES = [
    {
        anchor: ANCHORS.bottom,
        styles: {
            enterFrom: 'translate-y-full',
            enterTo: 'translate-y-0',
            leaveFrom: 'translate-y-0',
            leaveTo: 'translate-y-full'
        }
    },
    {
        anchor: ANCHORS.right,
        styles: {
            enterFrom: 'translate-x-full',
            enterTo: 'translate-x-0',
            leaveFrom: 'translate-x-0',
            leaveTo: 'translate-x-full'
        }
    },
    {
        anchor: ANCHORS.left,
        styles: {
            enterFrom: '-translate-x-full',
            enterTo: 'translate-x-0',
            leaveFrom: 'translate-x-0',
            leaveTo: '-translate-x-full'
        }
    },
];

const CLOSE_BUTTON_ANCHOR_STYLES = [
    {
        anchor: ANCHORS.right,
        className: 'top-4 sm:top-3 md:top-2 right-2'
    },
    {
        anchor: ANCHORS.left,
        className: 'top-4 sm:top-3 md:top-2 left-2'
    }
];

const CLOSE_BUTTON_DEFAULT_ICON = faTimes;

// TODO will need different solution for more levels of nesting.
const Z_INDEX_STYLE = {
    root: 'z-menu',
    child: 'z-submenu'
}

function invalidProp(message) {
    throw new Error(message);
}

function DefaultCloseButton({ onClick, anchor, icon, title }) {
    const anchorStyle = CLOSE_BUTTON_ANCHOR_STYLES.find(x => x.anchor === anchor)?.className || invalidProp(`Unsupported anchor for close button: '${anchor}'`);

    return (
        <button
            className={cx(
                'absolute h-6 w-6 rounded-full flex items-center justify-center',
                'text-gray-500 enabled:hover:text-gray-700 keyboard-only-focus-ring',
                anchorStyle
            )}
            title={title}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}

/**
 * Drawer which can contain arbitrary content.
 * @param {Object} props - The Props.
 * @param {boolean} props.open - Should the drawer currently be opened or closed?
 * @param {function} props.onClose - Callback fired when the user requests to close the drawer
 * @param {boolean} props.isChildDrawer - Is this drawer a child of another drawer?
 * @param {'right'|'left'|'bottom'=} props.anchor - The side of the viewport that the Drawer is anchored to. 
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'full'=} props.size - How much of the viewport should the drawer take up? 
 * @param {boolean=} props.showCloseButton - Should a default show button be rendered?
 * @param {'left'|'right'=} props.closeButtonAnchor - The side of the drawer that the default close button will be anchored to.
 * @param {IconDefinition=}  props.closeButtonIcon - The FontAwesomeIcon of the default close button.
 * @param {string}  props.closeButtonTitle - The text to display on close button hover.
 * @param {React.ReactNode} props.children - The child elements to render.
 */
export function Drawer({
    open = false,
    onClose,
    isChildDrawer = false,
    anchor = ANCHORS.right,
    size = SIZES.md,
    showCloseButton = false,
    closeButtonAnchor = ANCHORS.right,
    closeButtonIcon = CLOSE_BUTTON_DEFAULT_ICON,
    closeButtonTitle = 'Close',
    children,
}, z) {
    const anchorStyle = ANCHOR_STYLES.find(x => x.anchor === anchor)?.className || invalidProp(`Unsupported anchor: '${anchor}'`);
    const sizeStyle = SIZE_STYLES.find(x => x.size === size && x.anchors.includes(anchor))?.className || invalidProp(`Unsupported size: '${size}'`);
    const zStyle = isChildDrawer ? Z_INDEX_STYLE.child : Z_INDEX_STYLE.root;
    const transitionStyles = TRANSITION_STYLES.find(x => x.anchor === anchor)?.styles || invalidProp(`Transitions not supported for anchor: '${anchor}'`);
    const defaultCloseButtonProps = showCloseButton
        ? { anchor: closeButtonAnchor, icon: closeButtonIcon, title: closeButtonTitle, onClick: onClose }
        : null;

    return (
        <HeadlessDialog open={open} onClose={onClose} className={zStyle}>
            <DialogBackdrop />
            <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-300"
                leave="transform transition ease-in duration-200"
                {...transitionStyles}
            >
                <DialogContent className={cx(sizeStyle, anchorStyle, zStyle, "fixed shadow-xl bg-white focus:outline-none flex flex-col")}>
                    {children}
                    {!!showCloseButton && <DefaultCloseButton {...defaultCloseButtonProps} />}
                </DialogContent>
            </Transition.Child>
        </HeadlessDialog>
    );
}