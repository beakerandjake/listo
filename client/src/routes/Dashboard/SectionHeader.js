import cx from 'classnames';

/**
 * Header for a collapsible section.
 * @param {object} props
 * @param {string} props.title - Text of the header
 * @param {ReactNode} props.badge - Child to render next to the title
 * @param {ReactNode} props.addOns - Child to render on the right side of the header.
 * @param {string} props.className - Styles to apply to the header.
 */
export const SectionHeader = ({ title, badge, addOns, className, ...props }) => {
  return (
    <div
      {...props}
      className={cx(
        'border-b border-gray-200 pb-5 mb-5 flex items-center justify-between cursor-pointer select-none',
        className
      )}
    >
      <div className="flex gap-2">
        <h3 className="mr-2 text-lg font-medium leading-6 text-gray-900">
          {title}
        </h3>
        {badge}
      </div>
      {addOns}
    </div>
  );
};
