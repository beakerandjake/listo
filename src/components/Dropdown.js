import React, { cloneElement, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import {
    useFloating,
    autoUpdate,
    offset as offsetMiddleware,
    flip,
    shift,
} from '@floating-ui/react-dom';
import { mergeRefs } from 'react-merge-refs';
import cx from 'classnames';
import FocusLock from 'react-focus-lock';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useKeyDown } from 'hooks/useKeyDown';
import { Transition } from 'components/Transition';

/**
 * Invisible overlay which prevents interaction with anything behind it. 
 * @param {function=} props.onClick - Callback invoked when the user clicks inside of the overlay.
 */
const Overlay = forwardRef(({ onClick }, ref) => {
    // Capture the mouse down event then stop it to prevent anything else from getting it.
    const onMouseDownCapture = e => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
    };

    return createPortal(
        <div ref={ref} className="fixed inset-0" onMouseDownCapture={onMouseDownCapture} />,
        document.body
    );

});

/**
 * A floating dropdown menu rendered beneath a trigger. 
 * @param {Object} props - The props.
 * @param {ReactElement} props.trigger - The trigger element to render and position the floating content against.
 * @param {boolean} props.open - Is the menu currently open or closed?
 * @param {function=} props.onClickOutside - Callback invoked when the user clicks outside of the Dropdown.
 * @param {function=} props.onEscapeKeyDown - Callback invoked when the user presses the escape key.
 * @param {'top'| 'top-start'| 'top-end'| 'right'| 'right-start'| 'right-end'| 'bottom'|'bottom-start'|'bottom-end'|'left'|'left-start'|'left-end'=} props.placement - Where to place the floating element against the trigger.
 * @param {number} props.offset - Amount to displace the floating element from its default placement against the trigger.
 * @param {boolean} props.overlay - Should background content be blocked by an overlay?
 * @param {string}  props.className - Additional styles to be applied to the dropdown.
 * @param {React.ReactNode} props.children - The child elements to render.
 */
export const Dropdown = forwardRef(({
    trigger,
    open,
    onClickOutside,
    onEscapeKeyDown,
    placement = 'bottom-end',
    offset = 5,
    overlay = true,
    className,
    children,
}, forwardedRef) => {
    const { x, y, reference, floating, strategy, refs, } = useFloating({
        middleware: [offsetMiddleware(offset), flip(), shift()],
        whileElementsMounted: autoUpdate,
        placement: placement,
        strategy: 'fixed'
    });

    useOnClickOutside(e => onClickOutside && onClickOutside(e), !open, refs.floating, refs.reference);
    useKeyDown('Escape', () => onEscapeKeyDown && onEscapeKeyDown(), !open, true);

    return (
        <>
            {/* Dropdown Trigger */}
            {cloneElement(trigger, { ref: reference })}

            {/* Overlay*/}
            {(open && overlay) && (
                <Overlay onClick={e => onClickOutside && onClickOutside(e)} />
            )}

            {/* Dropdown Content */}
            {createPortal((
                <Transition
                    in={open}
                    unmountOnExit
                    classNames={{
                        enter: 'opacity-0',
                        enterActive: 'transition-opacity duration-200 !opacity-100',
                        exit: 'opacity-100',
                        exitActive: 'transition-opacity duration-75 !opacity-0'
                    }}
                >
                    {/* Floating parent container */}
                    <div
                        ref={mergeRefs([floating, forwardedRef])}
                        style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
                        className="top-0 left-0"
                    >
                        {/* Transforming scale causes issues with floating container, so apply the scale transform inside of it. */}
                        <Transition
                            in={open}
                            appear
                            classNames={{
                                appear: 'scale-90',
                                appearActive: 'transition-transform ease-out duration-200 !scale-100',
                                enter: 'scale-90',
                                enterActive: 'transition-transform ease-out duration-200 !scale-100',
                                exit: 'scale-100',
                                exitActive: 'transition-transform ease-out duration-75 !scale-90'
                            }}
                        >
                            {/* Styled Dropdown Container */}
                            <div
                                className={cx(
                                    'min-w-[14rem] rounded-md shadow-lg shadow-black/40 flex flex-col overflow-hidden',
                                    'bg-white ring-1 ring-offset-1 ring-gray-300 focus:outline-none',
                                    className
                                )}
                            >
                                {/* Dropdown Content */}
                                <FocusLock autoFocus={false}>
                                    {children}
                                </FocusLock>
                            </div>
                        </Transition>
                    </div>
                </Transition>
            ), document.body)}
        </>
    )
});