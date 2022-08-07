import { forwardRef } from 'react';
import classNames from 'classnames';

const VARIANTS = {
    danger: 'text-white bg-red-600 enabled:hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-700 text-green-100 enabled:hover:bg-green-800',
    default: 'text-gray-700 bg-white enabled:hover:bg-gray-50 focus:ring-indigo-500'
};

const SIZES = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-2 text-sm'
};

export const Button = forwardRef((props, ref) => {
    const { className, variant, size, ...leftOverProps } = props;

    const variantStyle = VARIANTS[variant] || VARIANTS.default;
    const sizeStyle = SIZES[size] || SIZES.default;

    return (
        <button
            {...leftOverProps}
            ref={ref}
            className={classNames(
                variantStyle,
                sizeStyle,
                'inline-flex items-center border border-gray-300 shadow-sm font-medium rounded-md',
                'disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2',
                className
            )}
        >
            {props.text}
        </button>
    )
});