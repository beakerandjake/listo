import cx from 'classnames';

/**
 * Styled container for a Menu Footer section.
 * @param {Object} props
 * @param {string} props.className - Additional styles to apply to the footer.
 * @param {React.ReactNode} props.children - The content of the footer.
 */
export function MenuFooter({ className, children }) {
  return (
    <div
      className={cx(
        'shrink-0 p-4 bg-white border-t border-gray-300',
        className
      )}
    >
      {children}
    </div>
  );
}
