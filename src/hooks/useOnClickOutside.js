import { useEffect } from "react";


/**
 * Fires a callback any time a click happens outside of the element. 
 * @param {React.RefObject} ref - The element to watch for clicks outside of.
 * @param {function} callback - The function that is invoked when the user clicks outside.
 * @param {boolean} disabled - Should this effect be disabled?
 */
export function useOnClickOutside(ref, callback, disabled) {
    useEffect(() => {
        if (!!disabled) {
            return;
        };

        const onClick = event => {
            if (ref.current?.contains(event.target)) {
                return;
            }

            callback(event);
        };

        document.addEventListener('mousedown', onClick);
        document.addEventListener('touchstart', onClick);

        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('touchstart', onClick);
        };
    }, [ref, callback, disabled]);
}