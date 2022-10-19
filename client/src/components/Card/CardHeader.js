import cx from 'classnames';

/**
 * Simple header element used in a Cards Header section.
 * @param {object} props
 * @param {ReactElement} props.children - Content of the header.
 * @param {string} props.className - Addition styles to apply to the root of the card.
 */
export const CardHeader = ({ children, className }) => {
  return (
    <h3
      className={cx('text-lg font-medium leading-6 text-gray-900', className)}
    >
      {children}
    </h3>
  );
};
