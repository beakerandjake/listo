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
  return (
    <div className="flex items-center gap-2">
      {React.Children.map(children, (child, index) => {
        // Add a divider between every valid child
        if (index > 0 && isValidElement(child)) {
          return (
            <>
              <ItemStatusFieldDivider />
              {child}
            </>
          );
        }

        return child;
      })}
    </div>
  );
};
