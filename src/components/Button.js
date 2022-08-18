import { forwardRef } from 'react';
import classNames from 'classnames';

const VARIANTS = {
    danger: 'text-white bg-red-600 enabled:hover:bg-red-700 focus-visible:ring-red-500',
    success: 'bg-green-700 text-green-100 enabled:hover:bg-green-800',
    default: 'text-gray-700 bg-white enabled:hover:bg-gray-50 focus-visible:ring-indigo-500'
};

const SIZES = {
    custom: ' ',
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-2 text-sm'
};


const BORDERS = {
    none: 'border-none',
    default: 'border border-gray-300'
};


/**
 * Styled button.
 * @param {Object} props - The props.
 * @param {React.} props.className - Additional styles to apply to the button.
 * @param {'danger'|'success'|'default'=} props.variant - Pre-set variant styling.
 * @param {'sm', 'default'=} props.size - Pre-set size styling.
 * @param {'none'=} props.border - Pre-set border styling.
 * @param {React.ReactNode} props.children - The child elements to render.
 */
export const Button = forwardRef(({
    className,
    variant = 'default',
    size = 'default',
    border = 'default',
    children,
    ...props
}, ref) => {
    const variantStyle = VARIANTS[variant];
    const sizeStyle = SIZES[size];
    const borderStyle = BORDERS[border];

    return (
        <button
            {...props}
            ref={ref}
            className={classNames(
                variantStyle,
                sizeStyle,
                borderStyle,
                'flex items-center justify-center gap-2 shadow-sm font-medium rounded-md',
                'disabled:cursor-not-allowed disabled:opacity-50 keyboard-only-focus-ring',
                className
            )}
        >
            {children}
        </button>
    )
});