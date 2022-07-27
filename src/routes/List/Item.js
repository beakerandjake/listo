

export function Item(props) {
    const toggleCompleted = () => { }

    return (
        <li className="flex gap-1 items-center py-2">
            <span className="grow-0">
                <input
                    type="checkbox"
                    className="focus:ring-green-500  text-green-700 border-gray-300 rounded-full cursor-pointer"
                    checked={props.completed}
                    onChange={toggleCompleted}
                />
            </span>
            <p
                className={'px-2 w-full cursor-pointer  ' + (props.completed ? 'line-through opacity-50' : '')}
                onClick={toggleCompleted}
            >
                {props.name}
            </p>
            <span className="grow-0 flex justify-between items-center gap-3">
                <span>Quantity</span>
                <span>Delete</span>
                {/* <QuantityButton quantity={props.quantity} onQuantityChange={quantity => props.onQuantityChange(props.id, quantity)} disabled={props.disabled || props.completed} />
        <DeleteButton onClick={() => props.onDelete(props.id)} disabled={props.disabled} /> */}
            </span>
        </li>
    )
}