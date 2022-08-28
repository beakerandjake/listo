import { useEffect } from "react";


/**
 * Fires a callback any time a click happens outside of the element. 
 * @param {function} callback - The function that is invoked when the user clicks outside.
 * @param {boolean} disabled - Should this effect be disabled?
 * @param {...React.RefObject} refs - The element(s) to watch for clicks outside of.
 */
export function useOnClickOutside(callback, disabled, ...refs) {
    useEffect(() => {
        if (!!disabled) {
            return;
        };

        const onClick = event => {
            if (event.defaultPrevented) {
                return;
            }

            if (refs.some(ref => ref?.current?.contains(event.target))) {
                return;
            }

            callback(event);
        };

        document.addEventListener('click', onClick);

        return () => {
            document.removeEventListener('click', onClick);
        };
    }, [refs, callback, disabled]);
}