import cx from 'classnames';

/**
 * Card component which renders content.
 * @param {object} props
 * @param {string} props.className - Addition styles to apply to the root of the card.
 * @param {ReactNode} props.header- Optional header section
 * @param {ReactNode} props.children - The content of the card.
 */
export const Card = ({ children, header, className }) => {
  return (
    <div
      className={cx(
        'divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow border border-gray-300',
        className
      )}
    >
      {/* Header */}
      {header && <div className="px-4 py-5 sm:px-6">{header}</div>}
      {/* Content */}
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};
