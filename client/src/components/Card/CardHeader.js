import cx from 'classnames';

/**
 * Header section for a Card.
 * @param {object} props
 * @param {string} props.className - Addition styles to apply.
 * @param {ReactNode} props.children - The content of the header.
 */
export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div
      {...props}
      className={cx(
        'border-b border-gray-200 bg-white px-4 py-5 sm:px-6',
        className
      )}
    >
      {children}
    </div>
  );
};
