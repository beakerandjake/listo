import React, { isValidElement } from 'react';

/**
 * Divider used to separate the ItemStatusFields of the ItemStatusBar.
 * @returns
 */
const ItemStatusFieldDivider = () => {
  return <span className="text-gray-400 text-xs font-medium">{'\u2022'}</span>;
};

/**
 * Renders
 * @param {object} props
 * @param {ReactNode} props.children - The child ItemStatusFields to render.
 * @returns
 */
export const ItemStatusBar = ({ children }) => {
  let validCount = 0;

  const separatedChildren = React.Children.map(children, (child) => {
    const isValidChild = isValidElement(child);

    if (isValidChild) {
      validCount += 1;
    }

    // Add a divider between every valid child
    if (validCount > 1 && isValidChild) {
      return (
        <>
          <ItemStatusFieldDivider />
          {child}
        </>
      );
    }

    return child;
  });

  return <div className="flex items-center gap-2">{separatedChildren}</div>;
};
