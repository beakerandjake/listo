import cx from 'classnames';

/**
 * Content section for a Card.
 * @param {object} props
 * @param {string} props.className - Addition styles to apply.
 * @param {ReactNode} props.children - The content to render.
 */
export const CardContent = ({ children, className }) => {
  return <div className={cx('px-4 py-5 sm:p-6', className)}>{children}</div>;
};
