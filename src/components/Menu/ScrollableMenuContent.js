import cx from 'classnames';

/**
 * Container which provides scrollable overflow for content.
 * @param {Object} props
 * @param {string} props.className - Additional styles to apply to the container.
 * @param {React.ReactNode} props.children - The content of the container.
 */
export function ScrollableMenuContent({ className, children }) {
  return (
    <div className={cx('flex-1 overflow-y-auto py-1', className)}>
      {children}
    </div>
  );
}
