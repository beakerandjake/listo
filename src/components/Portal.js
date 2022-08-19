import { forwardRef } from 'react';
import { Portal as ReactPortal } from 'react-portal';

/**
 * Full screen overlay which prevents interaction with content behind.
 */
const Overlay = () => {
    return (
        <div className="fixed inset-0"></div>
    );
}

/**
 * Portals the content to the document. 
 * @param {Object} props - The props.
 * @param {React.ReactNode} props.children - The child elements to portal.
 * @param {boolean} props.overlay - Should an screen overlay be rendered behind the content to prevent interaction with outside content?
 */
export const Portal = forwardRef(({
    overlay,
    children
}, ref) => {
    return (
        <ReactPortal ref={ref}>
            {overlay && <Overlay />}
            {children}
        </ReactPortal>
    )
});