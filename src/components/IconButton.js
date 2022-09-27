import { forwardRef } from 'react';
import cx from 'classnames';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Styled button which just displays an icon with small amount of padding.
 * @param {Object} props - The props.
 * @param {string}  props.className - Additional styles to be applied to the dropdown.
 * @param {IconDefinition} props.icon - The FontAwesome Icon to display.
 */
export const IconButton = forwardRef(({ className, icon, ...props }, ref) => {
  return (
    <Button
      {...props}
      ref={ref}
      className={cx(
        'bg-inherit shadow-none text-gray-500 enabled:hover:text-gray-700 enabled:hover:bg-inherit text-base p-1',
        className
      )}
      border="none"
      size="custom"
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
});
