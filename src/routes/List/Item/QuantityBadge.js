
export function QuantityBadge(props) {
    if (props.quantity <= 1) {
        return null;
    }

    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
            {props.quantity}
        </span>
    )
}