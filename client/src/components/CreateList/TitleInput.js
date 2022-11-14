import cx from 'classnames';
import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { listValidationConstants } from './CreateListDrawer';

/**
 * Input field for the title of the list.
 * @param {Object} props
 * @param {string} props.value - The value
 * @param {function} props.onChange - Callback invoked when name value changes.
 */
export const TitleInput = ({ error, value, onChange }) => {
  return (
    <div>
      <label className="block text-md font-medium text-gray-700">Title</label>
      <div className="relative mt-1">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          className={cx(
            error 
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500'
              : 'border-gray-300 keyboard-only-focus-ring',
            'block w-full rounded-md  shadow-sm  sm:text-sm'
          )}
          autoComplete="off"
          enterKeyHint="done"
          minLength={listValidationConstants.nameMinLength}
          maxLength={listValidationConstants.nameMaxLength}
          autoFocus={true}
        />
        {!!error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
        )}
      </div>
      {!!error && <p className="mt-2 text-md text-red-600">{error}</p>}
    </div>
  );
};
