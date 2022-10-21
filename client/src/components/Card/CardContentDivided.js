import cx from 'classnames';

/**
 * Content section for a Card which adds dividers between each child element.
 * @param {object} props
 * @param {string} props.className - Addition styles to apply.
 * @param {ReactNode} props.children - The content to render.
 */
export const CardContentDivided = ({ children, className }) => {
  return (
    <div className={cx('divide-y divide-gray-200 flex flex-col', className)}>
      {children}
    </div>
  );
};
