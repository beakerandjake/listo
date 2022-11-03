import cx from 'classnames';

/**
 * Simple heading element which can be used in a Cards Header section.
 * @param {object} props
 * @param {ReactElement} props.children - Content of the heading.
 * @param {string} props.className - Addition styles to apply.
 */
export const CardHeading = ({ children, className }) => {
  return (
    <h3
      className={cx('text-lg font-medium leading-6 text-gray-900', className)}
    >
      {children}
    </h3>
  );
};
