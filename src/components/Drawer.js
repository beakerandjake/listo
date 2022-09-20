import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import { Dialog, DialogContent, DialogBackdrop } from 'components/Dialog';
import { Transition } from './Transition';

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
        className: 'max-w-[16%]'
    },
    {
        size: SIZES.sm,
        anchors: [ANCHORS.left, ANCHORS.right],
        className: 'max-w-[33%]'
    },
    {
        size: SIZES.md,
        anchors: [ANCHORS.left, ANCHORS.right],
        className: 'max-w-[50%]'
    },
    {
        size: SIZES.lg,
        anchors: [ANCHORS.left, ANCHORS.right],
        className: 'max-w-[66%]'
    },
    {
        size: SIZES.xl,
        anchors: [ANCHORS.left, ANCHORS.right],
        className: 'max-w-[83%]'
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
        className: 'max-h-[16%]'
    },
    {
        size: SIZES.sm,
        anchors: [ANCHORS.bottom],
        className: 'max-h-[33%]'
    },
    {
        size: SIZES.md,
        anchors: [ANCHORS.bottom],
        className: 'max-h-[50%]'
    },
    {
        size: SIZES.lg,
        anchors: [ANCHORS.bottom],
        className: 'max-h-[66%]'
    },
    {
        size: SIZES.xl,
        anchors: [ANCHORS.bottom],
        className: 'max-h-[83%]'
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
            appear: 'opacity-60 translate-y-full',
            appearActive: '!opacity-100 !translate-y-0',
            exit: 'opacity-100 translate-y-0',
            exitActive: '!translate-y-full !opacity-60'
        }
    },
    {
        anchor: ANCHORS.right,
        styles: {
            appear: 'opacity-60 translate-x-full',
            appearActive: '!opacity-100 !translate-x-0',
            exit: 'opacity-100 translate-x-0',
            exitActive: '!translate-x-full !opacity-60'
        }
    },
    {
        anchor: ANCHORS.left,
        styles: {
            appear: 'opacity-60 -translate-x-full',
            appearActive: '!opacity-100 !translate-x-0',
            exit: 'opacity-100 translate-x-0',
            exitActive: '!opacity-60 !-translate-x-full'
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
 * @param {function} props.onExitTransitionComplete - Callback fired when the drawer has closed, and its exit transition has finished.
 * @param {'right'|'left'|'bottom'} props.anchor - The side of the viewport that the Drawer is anchored to. 
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'full'=} props.size - What is the max amount of the viewport the drawer should take up? 
 * @param {boolean=} props.showCloseButton - Should a default show button be rendered?
 * @param {'left'|'right'=} props.closeButtonAnchor - The side of the drawer that the default close button will be anchored to.
 * @param {IconDefinition=}  props.closeButtonIcon - The FontAwesomeIcon of the default close button.
 * @param {string}  props.closeButtonTitle - The text to display on close button hover.
 * @param {string}  props.className - Additional styles to be applied to the root of the drawer.
 * @param {string}  props.contentClassName - Additional styles to be applied to the content of the drawer.
 * @param {React.ReactNode} props.children - The child elements to render.
 */
export function Drawer({
    open,
    onClose,
    onExitTransitionComplete,
    anchor,
    size,
    showCloseButton = false,
    closeButtonAnchor = ANCHORS.right,
    closeButtonIcon = CLOSE_BUTTON_DEFAULT_ICON,
    closeButtonTitle = 'Close',
    className,
    contentClassName,
    children,
}, z) {
    const initialFocusRef = useRef(null);
    const [initialFocusCapture, setInitialFocusCapture] = useState(false);
    const anchorStyle = ANCHOR_STYLES.find(x => x.anchor === anchor)?.className || invalidProp(`Unsupported anchor: '${anchor}'`);
    const transitionStyles = TRANSITION_STYLES.find(x => x.anchor === anchor)?.styles || invalidProp(`Transitions not supported for anchor: '${anchor}'`);
    const sizeStyle = SIZE_STYLES.find(x => x.size === size && x.anchors.includes(anchor))?.className || '';
    const defaultCloseButtonProps = showCloseButton
        ? { anchor: closeButtonAnchor, icon: closeButtonIcon, title: closeButtonTitle, onClick: onClose }
        : null;

    // any time we are closed, reset the focus capture state.
    useEffect(() => {
        if (!open) {
            setInitialFocusCapture(false);
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            className={className}
            initialFocus={initialFocusRef}
            onExitTransitionComplete={onExitTransitionComplete}
        >
            <DialogBackdrop
                open={open}
                classNames={{
                    appear: 'opacity-0',
                    appearActive: 'transition-opacity ease-out duration-300 !opacity-100',
                    exit: 'opacity-100',
                    exitActive: 'transition-opacity ease-in duration-200 !opacity-0',
                }}
            />
            <div className="overflow-hidden">
                <Transition
                    in={open}
                    appear
                    classNames={{
                        appear: transitionStyles.appear,
                        appearActive: ['transform-[opacity,transition] ease-out duration-300', transitionStyles.appearActive].join(' '),
                        exit: transitionStyles.exit,
                        exitActive: ['transform-[opacity,transition] ease-in duration-200', transitionStyles.exitActive].join(' ')
                    }}
                >
                    <DialogContent
                        className={cx(
                            sizeStyle,
                            anchorStyle,
                            'fixed bg-white focus:outline-none flex flex-col',
                            contentClassName
                        )}
                    >
                        {/* Initial focus looks bad on mobile, disable it by capturing focus with an invisible element.
                        Once the user focuses on something else, remove this element from being focusable */}
                        <span
                            tabIndex={open && initialFocusCapture ? -1 : 0}
                            ref={initialFocusRef}
                            onBlur={() => setInitialFocusCapture(true)}
                            className="focus:outline-none focus:ring-0"
                        />
                        {children}
                        {!!showCloseButton && <DefaultCloseButton {...defaultCloseButtonProps} />}
                    </DialogContent>
                </Transition>
            </div>
        </Dialog>
    );
}