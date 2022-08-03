import classNames from 'classnames';

const variants = {
    danger: 'text-white bg-red-600 enabled:hover:bg-red-700',
    success: 'bg-green-700 text-green-100 enabled:hover:bg-green-800',
    default: 'text-gray-700 bg-white enabled:hover:bg-gray-50'
}

export function Button(props) {
    const variantStyle = variants[props.variant] || variants.default;

    return (
        <button
            className={classNames(variantStyle, 'disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-0')}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    )
}