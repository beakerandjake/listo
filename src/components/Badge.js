import classNames from "classnames";
import { forwardRef } from "react";

const sizes = {
    lg: 'px-3 py-0.5 text-sm',
    default: 'px-2.5 py-0.5 text-xs'
};

const variants = {
    success: 'bg-green-700 text-green-100',
    default: 'bg-gray-300 text-gray-800'
}

/**
 * Content Badge.
 * @param {Object} props
 * @param {'lg'|'default'} props.size - The pre-defined size of the badge.
 * @param {'default'|'success'|'danger'} props.variant - The variant style of the button.
 */
export const Badge = forwardRef(({
    size = 'default',
    variant = 'default',
    children
}, ref) => {
    const sizeClasses = sizes[size];
    const colorClasses = variants[variant];

    return (
        <span
            ref={ref}
            className={classNames(sizeClasses, colorClasses, "inline-flex items-center rounded-full font-medium ")}
        >
            {children}
        </span>
    )
});