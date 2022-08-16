import { Children, isValidElement, cloneElement, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
} from '@floating-ui/react-dom';
import FocusLock from 'react-focus-lock';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useKeyDown } from 'hooks/useKeyDown';

function iterateChildren(children, listItemsRef, getItemProps) {
    return Children.map(children, (child, index) => {
        // if the child is a Dropdown menu, then we don't want to map its list items
        if (!isValidElement(child) || child.props.__type === 'Dropdown') {
            return child;
        }

        if (child.props.children?.length > 0) {
            child = cloneElement(child, {
                children: iterateChildren(child.props.children, listItemsRef, getItemProps)
            });
        }

        if (child.props.__type === 'MenuItem') {
            child = cloneElement(child, getItemProps({
                role: "menuitem",
                ref: node => {
                    listItemsRef.current[index] = node;
                }
            }))
        }

        return child;
    })
}

export const Dropdown = ({
    open,
    onClickOutside,
    onEscapeKeyDown,
    onClose,
    trigger,
    children,
    placement = 'bottom-end'
}) => {
    const { x, y, reference, floating, strategy, refs, } = useFloating({
        middleware: [offset(5), flip(), shift()],
        whileElementsMounted: autoUpdate,
        placement: placement,
        strategy: 'fixed'
    });

    const listItemsRef = useRef([]);
    const [activeIndex, setActiveIndex] = useState(null);

    useOnClickOutside(refs.floating, e => onClickOutside && onClickOutside(e), !open);
    useKeyDown('Escape', () => onEscapeKeyDown && onEscapeKeyDown(), !open);

    return (
        <>
            {/* Dropdown Trigger */}
            {cloneElement(trigger, { ref: reference })}

            {/* Dropdown Content */}
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
        </>
    )
};