import { useEffect } from "react";


/**
 * Fires a callback any time a key is pressed. 
 * @param {string} key - The key to detect.
 * @param {function} callback - The function that is invoked when the key is pressed.
 * @param {boolean} disabled - Should this effect be disabled?
 */
export function useKeyDown(key, callback, disabled) {
    useEffect(() => {
        if (!!disabled) {
            return;
        }

        const onKeyDown = event => {
            if (event.key !== key) {
                return;
            }

            callback();
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [key, callback, disabled]);
}