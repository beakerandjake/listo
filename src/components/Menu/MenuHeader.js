import cx from 'classnames';
import React from 'react';

/**
 * Styled container for a Menu Header section.
 * @param {Object} props
 * @param {string} props.className - Additional styles to apply to the header. 
 * @param {React.ReactNode} props.children - The content of the header.
 */
export function MenuHeader({ className, children }) {
    return (
        <div className={cx('shrink-0 p-4 sm:p-3 md:p-2 bg-white drop-shadow border-b border-gray-300', className)}>
            {children}
        </div>
    )
}

/**
 * Styled Title for a Menu.
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content of the title.
 * @param {string} props.className - Additional styles to apply to the title. 
 */
export function MenuTitle({ children, className }) {
    return (
        <div className={cx('text-md font-semibold text-gray-500 select-none truncate', className)}>
            {children}
        </div>
    )
}