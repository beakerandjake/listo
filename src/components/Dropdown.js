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

export function Dropdown({ open, onClose, triggerElement }) {
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

    const { getReferenceProps, getFloatingProps, } = useInteractions([
        useDismiss(context),
    ]);

    console.log(getReferenceProps());

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
                className="absolute top-0 left-0 flex items-center justify-center bg-pink-500"
                ref={floating}
                style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                }}
                {...getFloatingProps()}
            >
                Hello World!
            </div>
        </Transition>
    )
}