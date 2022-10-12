import cx from 'classnames';
import { faLoader } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DelayedRender } from 'components/DelayedRender';
import { FadeAndPopIn } from 'components/Transition';

const SIZES = {
  default: {
    icon: '2x',
    message: 'text-base',
  },
  xl: {
    icon: '5x',
    message: 'text-xl',
  },
};

/**
 * Loading Spinner to indicate an operation is taking place.
 * @param {object} props
 * @param {IconDefinition} props.icon - Callback invoked when the user changes an item.
 * @param {'default'|'xl'} props.size - Predefined size of the component.
 * @param {string} props.message - Message to display.
 * @param {number} props.renderDelayMs - Optional amount of time to delay rendering to prevent content flashes on quick finishing actions
 */
export const LoadingSpinner = ({
  icon = faLoader,
  size = 'default',
  message = 'Loading...',
  renderDelayMs = 0,
}) => {
  const sizes = SIZES[size] || SIZES.default;

  return (
    <DelayedRender delayMs={renderDelayMs}>
      <FadeAndPopIn in appear>
        <div className="text-center">
          <FontAwesomeIcon
            icon={icon}
            spin
            size={sizes.icon}
            className="text-gray-600"
          />
          <p className={cx('mt-4 font-medium text-gray-500', sizes.message)}>
            {message}
          </p>
        </div>
      </FadeAndPopIn>
    </DelayedRender>
  );
};
