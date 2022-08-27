import { useCallback, useRef } from "react";

let lockCount = 0;

/**
 * Locks scrolling on the body. Automatically handles multiple locks applied and only removes lock when the last lock is removed.
 */
export const useScrollLock = () => {
    const scrollPosition = useRef(0);

    const lockScroll = useCallback(() => {
        lockCount += 1;

        // if we've already applied the lock, don't apply it again.
        if (lockCount > 1) {
            return;
        }

        document.body.style.overflow = 'hidden';

        // get the current scroll location of the body before fixing the position
        scrollPosition.current = window.scrollY;

        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        // maintain the current scroll position by offsetting the body by that amount. 
        document.body.style.top = `-${scrollPosition.current}px`;
    }, []);

    const unlockScroll = useCallback(() => {
        // don't unlock if not locked.
        if (lockCount <= 0) {
            return;
        }

        lockCount -= 1;

        // don't unlock if more locks are held in the lock queue.
        if (lockCount > 0) {
            return;
        }

        // undo all custom styles we used to prevent scroll.
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // scroll the window back to the original scroll position.
        window.scrollTo(0, scrollPosition.current);
    }, []);

    const forceUnlockScroll = useCallback(() => {
        lockCount = 1;
        unlockScroll();
    }, [unlockScroll]);

    return {
        lockScroll,
        unlockScroll,
        forceUnlockScroll
    }
}