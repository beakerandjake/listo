import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from 'classnames';

/**
 * Button styled for the Add Item Toolbar.
 * @param {Object} props - The props.
 * @param {IconDefinition} props.icon - The icon to display.
 * @param {string=} props.text - The text to display (if any). 
 * @param {string=} props.className - Additional styles to apply. 
 */
export const ToolbarButton = forwardRef(({
    icon,
    text,
    className,
    ...props
}, ref) => {
    return (
        <button
            {...props}
            ref={ref}
            className={cx(
                'p-1 flex items-center justify-between gap-1 leading-0 keyboard-only-focus-ring',
                'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
                'rounded shadow-sm border border-gray-300 bg-white enabled:hover:bg-gray-50 text-gray-700',
                className
            )}>
            <FontAwesomeIcon icon={icon} fixedWidth />
            {text && <span className="text-sm">{text}</span>}
        </button>
    )
});