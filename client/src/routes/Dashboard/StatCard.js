import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { Card, CardContent } from 'components/Card';
import { FadeQuick, SwitchTransition } from 'components/Transition';

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

const SIZES = {
  default: {
    description: 'text-3xl',
  },
  sm: {
    description: 'text-xl',
  },
};

/**
 * A card which renders a single stat.
 * @param {object} props
 * @param {string} props.name - The name of the stat.
 * @param {string} props.stat - The stat to display.
 * @param {IconDefinition} props.icon - Optional icon to display.
 * @param {'default'|'danger'|'primary'|'secondary'} props.variant - The color variant.
 * @param {'default'|'sm'} props.size - The size variant.
 */
export const StatCard = ({
  name,
  stat,
  icon,
  variant = 'default',
  size = 'default',
}) => {
  const variants = VARIANTS[variant] || VARIANTS.default;
  const sizes = SIZES[size] || SIZES.default;

  return (
    <Card className="cursor-default select-none max-w-sm">
      <CardContent className="flex items-center justify-between">
        {/* Content */}
        <div>
          <dt className={cx('truncate text-sm font-medium', variants.name)}>
            {name}
          </dt>
          <dd
            className={cx(
              'mt-1 font-semibold tracking-tight',
              variants.stat,
              sizes.description
            )}
          >
            <SwitchTransition switchKey={stat || ''} as={FadeQuick}>
              <span>{stat === null || stat === undefined ? '-' : stat}</span>
            </SwitchTransition>
          </dd>
        </div>
        {/* Icon */}
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={cx('text-2xl sm:text-3xl', variants.icon)}
          />
        )}
      </CardContent>
    </Card>
  );
};
