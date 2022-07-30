
export function QuantityButton(props) {
    const quantity = parseInt(props.quantity);

    return (
        <fieldset
            disabled={props.disabled}
            className={"flex flex-grow-0 divide-x divide-gray-300 border border-gray-300 rounded h-8 shadow-sm text-gray-700 bg-white disabled:opacity-50"}
        >
            <button
                className={"w-8 rounded-l hover:bg-gray-50 enabled:cursor-pointer disabled:opacity-50 disabled:select-none disabled:cursor-not-allowed"}
                onClick={() => props.onQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
            >
                -
            </button>
            <span className="w-10 font-semibold flex items-center justify-center">
                {quantity}
            </span>
            <button
                className="w-8 rounded-r hover:bg-gray-50 enabled:cursor-pointer disabled:select-none disabled:cursor-not-allowed"
                onClick={() => props.onQuantityChange(quantity + 1)}>
                +
            </button>
        </fieldset>
    );
}