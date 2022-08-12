import cx from 'classnames';

/**
 * Styled container for a Drawer Header.
 * @param {Object} props
 * @param {string} props.className - Additional styles to apply to the header. 
 * @param {React.ReactNode} props.children - The content of the header.
 */
export function MenuHeader({ className, children }) {
    return (
        <div className={cx('shrink-0 p-4 bg-white drop-shadow border-b border-gray-300', className)}>
            {children}
        </div>
    )
}