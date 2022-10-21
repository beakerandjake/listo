import cx from 'classnames';

const SIZES = {
  default: 'text-sm md:text-base',
  lg: 'text-2xl',
};

/**
 * Label to display the Items Name, will apply special styling if the item is completed.
 * @param {Object} props - The props
 * @param {string} props.name - The name of the item.
 * @param {boolean} props.completed - Has the item been marked as completed?
 * @param {string} props.className - Additional styles to apply to the element.
 * @param {'default'|'lg'} props.size - Predefined size variant to use.
 */
export const ItemNameLabel = ({
  name,
  completed,
  className,
  size = 'default',
  ...props
}) => {
  return (
    <p
      {...props}
      className={cx(
        completed ? 'decoration-auto' : 'decoration-transparent',
        'transition-colors duration-75 line-through',
        size in SIZES ? SIZES[size] : SIZES.default,
        className
      )}
    >
      {name}
    </p>
  );
};
