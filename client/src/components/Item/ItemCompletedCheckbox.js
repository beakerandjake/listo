import { useState } from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck as faSquareCheckSolid } from '@fortawesome/pro-solid-svg-icons';
import {
  faSquare,
  faSquareCheck as faSquareCheckRegular,
} from '@fortawesome/pro-regular-svg-icons';

/**
 * Checkbox which lets a user mark an item as complete or incomplete.
 * @param {Object} props
 * @param {boolean} props.checked - The value of the checkbox.
 * @param {function} props.onChange - Callback invoked when the user changes the value.
 */
export function ItemCompletedCheckbox({ checked, onChange }) {
  const [hover, setHover] = useState(false);

  // Toggle the checkbox on keypress.
  const onKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      onChange(!checked);
    }
  };

  // Toggle the checkbox on click.
  const onClick = (e) => {
    e.stopPropagation();
    onChange(!checked);
  };

  let icon = checked
    ? faSquareCheckSolid
    : hover
    ? faSquareCheckRegular
    : faSquare;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center justify-center w-8 h-8 rounded cursor-pointer group focus:outline-none"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      title={checked ? 'Set Item Active' : 'Set Item Completed'}
    >
      <FontAwesomeIcon
        icon={icon}
        className={cx(
          checked ? 'text-green-700' : 'text-gray-400',
          'rounded group-focus group-focus-visible:outline-none group-focus-visible:ring-2',
          'group-focus-visible:ring-offset-2 group-focus-visible:ring-green-700'
        )}
      />
    </div>
  );
}
