import { cloneElement } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { Transition } from '@headlessui/react';
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
} from '@floating-ui/react-dom';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useKeyDown } from 'hooks/useKeyDown';

/**
 * A floating dropdown menu rendered beneath a trigger. 
 * @param {Object} props - The props.
 * @param {React.} props.open - Is the menu currently open or closed?
 * @param {boolean} props.open - Is the menu currently open or closed?
 * @param {function=} props.onClickOutside - Callback invoked when the user clicks outside of the Dropdown.
 * @param {function=} props.onEscapeKeyDown - Callback invoked when the user presses the escape key.
 * @param {React.ReactNode} props.children - The child elements to render.
 * @param {'top'| 'top-start'| 'top-end'| 'right'| 'right-start'| 'right-end'| 'bottom'|'bottom-start'|'bottom-end'|'left'|'left-start'|'left-end'=} props.placement - Where to place the floating element against the trigger.
 * @param {number} props.offset - Amount to displace the floating element from its default placement against the trigger.
 */
export const Dropdown = ({
    trigger,
    open,
    onClickOutside,
    onEscapeKeyDown,
    placement = 'bottom-end',
    offsetAmount = 5,
    children,
}) => {
    const { x, y, reference, floating, strategy, refs, } = useFloating({
        middleware: [offset(offsetAmount), flip(), shift()],
        whileElementsMounted: autoUpdate,
        placement: placement,
        strategy: 'fixed'
    });

    useOnClickOutside(refs.floating, e => onClickOutside && onClickOutside(e), !open);
    useKeyDown('Escape', () => onEscapeKeyDown && onEscapeKeyDown(), !open);

    return (
        <>
            {/* Dropdown Trigger */}
            {cloneElement(trigger, { ref: reference })}

            {/* Dropdown Content */}
            {createPortal((
                <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="opacity-0"
                    enterTo=" opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <FocusLock autoFocus={false}>
                        <div
                            ref={floating}
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
};