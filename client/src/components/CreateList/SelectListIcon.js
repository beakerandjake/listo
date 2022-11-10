import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RadioGroup } from '@headlessui/react';
import cx from 'classnames';

/**
 * Displays available icons and allows the user to select one.
 * @param {Object} props - The props.
 * @param {object} props.value - The selected icon.
 * @param {function} props.onChange - Callback invoked when the value is changed.
 * @param {IconDefinition[]} props.icons - The available icons to select.
 */
export const SelectListIcon = ({
  value = null,
  onChange = () => {},
  icons = [],
}) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label className="block text-md font-medium text-gray-700">
        Icon
      </RadioGroup.Label>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 mt-2 select-none">
        {icons.map((x) => (
          <RadioGroup.Option
            key={x.iconName}
            value={x}
            className="focus:outline-none focus:select-none"
          >
            {({ active, checked }) => (
              <div
                className={cx(
                  active ? 'ring-2 ring-offset-2 ring-green-600' : '',
                  checked
                    ? 'bg-green-700 border-transparent text-white hover:bg-green-800'
                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                  'cursor-pointer focus:outline-none border rounded-md py-3 px-3 flex items-center justify-center'
                )}
              >
                <FontAwesomeIcon icon={x} size="lg" fixedWidth />
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};
