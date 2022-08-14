import {
    useFloating,
    useDismiss,
    useInteractions,
    offset,
    flip,
    shift,
    autoUpdate
} from '@floating-ui/react-dom-interactions';
import { useLayoutEffect, useState } from 'react';

export function Floater({ anchorRef, open, onClose }) {
    const { x, y, strategy, reference, floating, context } = useFloating({
        open,
        onOpenChange: value => {
            console.log('on open change', value);
            onClose();
        },
        placement: 'bottom-end',
        middleware: [offset(2), flip(), shift()],
        whileElementsMounted: autoUpdate
    });

    const {getReferenceProps, getFloatingProps} = useInteractions([
        useDismiss(context, {
          // props
        }),
      ]);

    useLayoutEffect(() => {
        reference(anchorRef.current);
    }, [anchorRef, reference]);

    return (
        <>
            {open && (
                <div
                    className="bg-pink-500 w-20 absolute top-0 left-0"
                    ref={floating}
                    style={{
                        position: strategy,
                        top: y ?? 0,
                        left: x ?? 0
                    }}
                >
                    Floaty!
                </div>
            )}
        </>
    )
}