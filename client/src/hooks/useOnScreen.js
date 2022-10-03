import { useEffect, useState } from 'react';

/**
 * Hook which returns whether or not the element is currently on screen.
 * @param {Object} props - The props.
 * @param {MutableRefObject} props.targetRef - A ref of the target to test visibility for.
 * @param {string} props.rootMargin - Passed to the IntersectionObserver's rootMargin option.
 * @returns {boolean}
 */
export const useOnScreen = (targetRef, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );

    const ref = targetRef.current;

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [targetRef, rootMargin]);

  return isIntersecting;
};
