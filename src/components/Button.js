import { forwardRef } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export const Button = forwardRef((props, ref) => {
    const { className, variant, size, border, ...leftOverProps } = props;

    const variantStyle = VARIANTS[variant] || VARIANTS.default;
    const sizeStyle = SIZES[size] || SIZES.default;
    const borderStyle = BORDERS[border] || BORDERS.default;

    console.log('size', size, 'style', sizeStyle, 'raw', SIZES[size]);

    console.log(classNames(
        variantStyle,
        sizeStyle,
        borderStyle,
        'flex items-center justify-between gap-2 shadow-sm font-medium rounded-md',
        'disabled:cursor-not-allowed disabled:opacity-50 keyboard-only-focus-ring',
        className
    ));

    return (
        <button
            {...leftOverProps}
            ref={ref}
            className={classNames(
                variantStyle,
                sizeStyle,
                borderStyle,
                'flex items-center justify-between gap-2 shadow-sm font-medium rounded-md',
                'disabled:cursor-not-allowed disabled:opacity-50 keyboard-only-focus-ring',
                className
            )}
        >
            {!!props.icon && <FontAwesomeIcon icon={props.icon} />}
            {props.text}
        </button>
    )
});