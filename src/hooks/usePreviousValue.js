import { useEffect, useRef } from 'react';

/**
 * Returns the value from the last render.
 * @param {any} value - The value to cache the previous version of.
 */
export const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
