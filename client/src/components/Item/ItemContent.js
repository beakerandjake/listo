import cx from 'classnames';

/**
 * Container which provides consistent styles to Item Cards.
 * @param {object} props
 * @param {string} props.className - Addition styles to apply.
 * @param {ReactNode} props.children - The content to render.
 * @returns
 */
export const ItemContent = ({ children, className }) => {
  return (
    <div className={cx('flex items-center py-2 px-3 min-h-[50px]', className)}>
      {children}
    </div>
  );
};
