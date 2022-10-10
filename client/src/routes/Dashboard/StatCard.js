import cx from 'classnames';

const VARIANTS = {
  default: {
    name: 'text-gray-700',
    stat: 'text-gray-800',
  },
  danger: {
    name: 'text-red-700',
    stat: 'text-red-800',
  },
  primary: {
    name: 'text-green-700',
    stat: 'text-green-800',
  },
  secondary: {
    name: 'text-indigo-700',
    stat: 'text-indigo-800',
  },
};

/**
 * A card which renders a single stat.
 * @param {object} props
 * @param {string} props.name - The name of the stat.
 * @param {string} props.stat - The stat to display.
 */
export const StatCard = ({ name, stat, variant = 'default' }) => {
  const classNames = VARIANTS[variant] || VARIANTS.default;

  return (
    <div
      className={
        'overflow-hidden rounded-lg px-4 py-4 shadow sm:p-6 bg-white border border-gray-300'
      }
    >
      <dt className={cx('truncate text-sm font-medium', classNames.name)}>
        {name}
      </dt>
      <dd
        className={cx(
          'mt-1 text-3xl font-semibold tracking-tight',
          classNames.stat
        )}
      >
        {stat}
      </dd>
    </div>
  );
};
