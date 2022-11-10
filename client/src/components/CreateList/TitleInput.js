import { listValidationConstants } from './CreateListDrawer';

/**
 * Input field for the title of the list.
 * @param {Object} props
 * @param {string} props.value - The value
 * @param {function} props.onChange - Callback invoked when name value changes.
 */
export const TitleInput = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-md font-medium text-gray-700">Title</label>
      <div className="mt-1">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm keyboard-only-focus-ring sm:text-sm"
          autoComplete="off"
          enterKeyHint="done"
          minLength={listValidationConstants.nameMinLength}
          maxLength={listValidationConstants.nameMaxLength}
          autoFocus={true}
        />
      </div>
    </div>
  );
};
