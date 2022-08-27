import { useCallback, useLayoutEffect, useRef } from "react";


export const useScrollLock = (enabled) => {
    const scrollPosition = useRef(0);

    const lockScroll = useCallback(() => {
        document.body.style.overflow = 'hidden';

        // get the current scroll location of the body before fixing the position
        scrollPosition.current = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        // maintain the current scroll position by offsetting the body by that amount. 
        document.body.style.top = `-${scrollPosition.current}px`;
    }, []);

    const unlockScroll = useCallback(() => {

        // undo all custom styles we used to prevent scroll.
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // scroll the window back to the original scroll position.
        window.scrollTo(0, scrollPosition.current);
    }, []);

    return {
        lockScroll,
        unlockScroll
    }
}