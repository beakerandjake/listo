import { forwardRef } from 'react';
import classNames from 'classnames';

const variants = {
    danger: 'text-white bg-red-600 enabled:hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-700 text-green-100 enabled:hover:bg-green-800',
    default: 'text-gray-700 bg-white enabled:hover:bg-gray-50 focus:ring-indigo-500'
}

export const Button = forwardRef((props, ref) => {
    const { className, variant, ...leftOverProps } = props;

    const variantStyle = variants[variant] || variants.default;

    return (
        <button
            {...leftOverProps}
            ref={ref}
            className={classNames(
                variantStyle,
                'inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md',
                'disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2',
                className
            )}
        >
            {props.text}
        </button>
    )
});