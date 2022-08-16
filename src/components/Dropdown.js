import { Children, useLayoutEffect, isValidElement, cloneElement, useRef, useState, forwardRef, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import {
    useFloating,
    useInteractions,
    useDismiss,
    autoUpdate,
    offset,
    flip,
    shift,
    useListNavigation,
    useFloatingParentNodeId,
    FloatingTree,
    useFloatingTree,
    useFloatingNodeId,
    FloatingNode,
    FloatingPortal,
    FloatingFocusManager
} from '@floating-ui/react-dom-interactions';
import { mergeRefs } from "react-merge-refs";


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


const DropdownComponent = forwardRef(({
    open,
    onClose,
    trigger,
    children,
    placement = 'bottom-end'
}, ref) => {

    const listItemsRef = useRef([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const nested = !!parentId;

    const { x, y, reference, floating, strategy, context, } = useFloating({
        open,
        onOpenChange: value => {
            console.log('Dropdown - onOpenChange: ', value);
            !value && onClose()
        },
        middleware: [offset(5), flip(), shift()],
        whileElementsMounted: autoUpdate,
        placement: placement,
        strategy: 'fixed',
        nodeId
    });

    // Hook into dom interactions.
    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
        useDismiss(context),
        useListNavigation(context, {
            listRef: listItemsRef,
            activeIndex: activeIndex,
            onNavigate: setActiveIndex,
            loop: true,
        })
    ]);

    // Support external trigger. 
    // useLayoutEffect(() => {
    //     reference(triggerElement.current);
    // }, [triggerElement]);

    const menuItems = iterateChildren(children, listItemsRef, getItemProps);

    const mergedReferenceRef = useMemo(() => mergeRefs([ref, reference]), [
        reference,
        ref
    ]);

    const newTrigger = cloneElement(trigger, getReferenceProps({
        ref: mergedReferenceRef,
    }))

    return (
        <FloatingNode id={nodeId}>
            {newTrigger}
            <FloatingPortal>
                <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="opacity-0"
                    enterTo=" opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <FloatingFocusManager
                        context={context}
                        preventTabbing
                        order={["reference", "content"]}
                    >
                        <div
                            {...getFloatingProps({
                                ref: floating,
                                className: 'absolute top-0 left-0 min-w-[14rem] rounded-md shadow-lg flex flex-col overflow-hidden bg-white ring-1 ring-offset-1 ring-gray-300 focus:outline-none',
                                style: {
                                    position: strategy,
                                    top: y ?? 0,
                                    left: x ?? 0,
                                }
                            })}
                        >
                            {menuItems}
                        </div>
                    </FloatingFocusManager>
                </Transition>
            </FloatingPortal>
        </FloatingNode>
    )
});

export const Dropdown = forwardRef((props, ref) => {
    const parentId = useFloatingParentNodeId();

    if (parentId === null) {
        return (
            <FloatingTree>
                <DropdownComponent {...props} ref={ref} />
            </FloatingTree>
        );
    }

    return <DropdownComponent {...props} ref={ref} />;
});

Dropdown.propTypes = {
    __type: PropTypes.string
};

Dropdown.defaultProps = {
    __type: 'Dropdown'
};
