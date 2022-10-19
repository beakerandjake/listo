import cx from 'classnames';

/**
 * Basic Card component.
 * @param {object} props
 * @param {string} props.className - Addition styles to apply to the card.
 * @param {ReactNode} props.children - The content of the card.
 */
export const Card = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={cx(
        'overflow-hidden rounded-lg bg-white shadow border border-gray-300',
        className
      )}
    >
      {children}
    </div>
  );
};
