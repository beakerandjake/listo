import { forwardRef } from 'react';
import classNames from 'classnames';

const variants = {
    danger: 'text-white bg-red-600 enabled:hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-700 text-green-100 enabled:hover:bg-green-800',
    default: 'text-gray-700 bg-white enabled:hover:bg-gray-50 focus:ring-indigo-500'
}

export const Button = forwardRef((props, ref) => {
    const variantStyle = variants[props.variant] || variants.default;

    return (
        <button
            ref={ref}
            className={classNames(variantStyle, 'disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2', props.className)}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    )
});