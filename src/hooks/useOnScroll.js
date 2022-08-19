import { useEffect } from "react";

/**
 * Fires a callback any time the window is scrolled. 
 * @param {function} callback - The function that is invoked when the window is scrolled.
 * @param {boolean} disabled - Should this effect be disabled?
 */
export function useOnScroll(callback, disabled) {
    useEffect(() => {
        if (!!disabled) {
            return;
        };

        const onScroll = event => {
            callback(event);
        };

        window.addEventListener('scroll', onScroll, true);

        return () => {
            window.removeEventListener('scroll', onScroll, true);
        };
    }, [callback, disabled]);
}

