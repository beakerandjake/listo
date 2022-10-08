import { useState, useEffect } from 'react';

/**
 * Waits a specified amount of time before rendering the children.
 * @param {object} props - the props
 * @param {number} props.delayMs - The number of ms to wait before rendering.
 * @param {React.ReactNode} props.children - The component to render, after the delay.
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
