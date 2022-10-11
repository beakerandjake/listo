import { faCat } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

const VARIANTS = {
  default: {
    name: 'text-gray-700',
    stat: 'text-gray-800',
    icon: 'text-gray-700 opacity-50',
  },
  danger: {
    name: 'text-red-700',
    stat: 'text-red-800',
    icon: 'text-red-800 opacity-50',
  },
  primary: {
    name: 'text-green-700',
    stat: 'text-green-800',
    icon: 'text-green-800 opacity-50',
  },
  secondary: {
    name: 'text-indigo-700',
    stat: 'text-indigo-800',
    icon: 'text-indigo-800 opacity-50',
  },
};

/**
 * A card which renders a single stat.
 * @param {object} props
 * @param {string} props.name - The name of the stat.
 * @param {string} props.stat - The stat to display.
 * @param {IconDefinition} props.icon - Optional icon to display.
 * @param {string} props.variant - The color variant.
 */
export const StatCard = ({ name, stat, icon, variant = 'default' }) => {
  const classNames = VARIANTS[variant] || VARIANTS.default;

  return (
    <div
      className={cx(
        'flex items-center justify-between overflow-hidden p-4 sm:p-6',
        'bg-white border border-gray-300 rounded-lg shadow'
      )}
    >
      <div>
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
      {icon && (
        <FontAwesomeIcon icon={icon} className={cx('hidden sm:block sm:text-3xl', classNames.icon)} />
      )}
    </div>
  );
};
