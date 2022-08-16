import { useLayoutEffect } from 'react';
import { Transition } from '@headlessui/react';
import {
    useFloating,
    useInteractions,
    useDismiss,
    autoUpdate,
    offset,
    flip,
    shift
} from '@floating-ui/react-dom-interactions';

export function Dropdown({ open, onClose, triggerElement, children }) {
    const { x, y, reference, floating, strategy, context, } = useFloating({
        open,
        onOpenChange: value => {
            console.log('Dropdown - onOpenChange: ', value);
            !value && onClose()
        },
        whileElementsMounted: autoUpdate,
        placement: 'bottom',
        strategy: 'fixed',
        middleware: [offset(5), flip(), shift()]
    });

    // Hook into dom interactions.
    const { getReferenceProps, getFloatingProps, } = useInteractions([
        useDismiss(context),
    ]);

    // Support external trigger. 
    useLayoutEffect(() => {
        reference(triggerElement.current);
    }, [triggerElement]);


    return (
        <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
            <div
                className="absolute top-0 left-0 min-w-[14rem] rounded-md shadow-lg flex flex-col overflow-hidden bg-white ring-1 ring-offset-1 ring-gray-300 focus:outline-none"
                ref={floating}
                style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                }}
                {...getFloatingProps()}
            >
                {children}
            </div>
        </Transition>
    )
}