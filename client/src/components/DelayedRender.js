import { useState, useEffect } from 'react';

/**
 * Allows the user to add a new Item to the list.
 * @param {object} props - the props
 * @param {function} props.onAddItem - Callback invoked when the user wants to add a new Item to the list.
 **/
export const DelayedRender = ({ children, delayMs = 500 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delayMs);
    
    return () => clearTimeout(timer);
  }, [delayMs]);

  return visible ? children : null;
};
