import { forwardRef } from "react";
import cx from 'classnames';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Styled button which triggers a dropdown menu. 
 * @param {Object} props - The props.
 * @param {React.} props.className - Additional styles to apply to the button.
 */
export const EllipsisMenuTrigger = forwardRef(({ className, ...props }, ref) => {
    return (
        <button
            {...props}
            ref={ref}
            className={cx(
                'h-5 w-5 rounded-full flex items-center justify-center shrink-0 grow-0',
                'bg-gray-100 text-gray-400 hover:text-gray-600 keyboard-only-focus-ring',
                className
            )}
        >
            <FontAwesomeIcon icon={faEllipsisH} size="lg" />
        </button>
    )
});