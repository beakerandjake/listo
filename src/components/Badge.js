import classNames from "classnames";

const sizes = {
    lg: 'px-3 py-0.5 text-sm',
    default: 'px-2.5 py-0.5 text-xs'
};

const variants = {
    success: 'bg-green-700 text-green-100',
    default: 'bg-gray-300 text-gray-800'
}

export function Badge(props) {

    const sizeClasses = variants[props.size] || sizes.default;
    const colorClasses = variants[props.variant] || variants.default;

    return (
        <span className={classNames(sizeClasses, colorClasses, "inline-flex items-center rounded-full font-medium ")}>
            {props.content}
        </span>
    )
}