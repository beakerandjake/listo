import React, { cloneElement, forwardRef, useRef } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { Transition } from '@headlessui/react';
import {
    useFloating,
    autoUpdate,
    offset as offsetMiddleware,
    flip,
    shift,
} from '@floating-ui/react-dom';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useKeyDown } from 'hooks/useKeyDown';
import { mergeRefs } from 'react-merge-refs';

/**
 * Invisible overlay which prevents interaction with anything behind it. 
 * @param {function=} props.onClick - Callback invoked when the user clicks inside of the overlay.
 */
const Overlay = forwardRef(({ onClick }, ref) => {
    // Capture the mouse down event then stop it to prevent anything else from getting it.
    const onMouseDownCapture = e => {
        e.preventDefault();
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

            {/* Dropdown Content */}
            {createPortal((
                <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    {overlay && <Overlay onClick={e => onClickOutside && onClickOutside(e)} />}
                    <FocusLock autoFocus={false}>
                        <div
                            ref={mergeRefs([floating, forwardedRef])}
                            className="absolute top-0 left-0 min-w-[14rem] rounded-md shadow-lg flex flex-col overflow-hidden bg-white ring-1 ring-offset-1 ring-gray-300 focus:outline-none"
                            style={{
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                            }}
                        >
                            {children}
                        </div>
                    </FocusLock>
                </Transition>
            ), document.body)}
        </>
    )
});