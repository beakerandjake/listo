import React, { memo } from "react";
import QuantityButton from "./QuantityButton";
import DeleteButton from './DeleteButton';

function Item(props) {
    console.log('render', props.name);
    return (
        <li className="flex flex-start gap-1 items-center px-4 py-3 md:px-0">
            <span className="grow-0">
                <input
                    type="checkbox"
                    className="focus:ring-green-500 h-4 w-4 text-green-700 border-gray-300 rounded cursor-pointer"
                    checked={props.completed}
                    onChange={() => props.onToggleCompleted(props.id, !props.completed)}
                />
            </span>
            <p className={'px-2 w-full ' + (props.completed ? 'line-through opacity-50' : '')}>
                {props.name}
            </p>
            <span className="grow-0 flex justify-between items-center divide-x">
                <span className="px-2">
                    <QuantityButton quantity={props.quantity} onQuantityChange={quantity => props.onQuantityChange(props.id, quantity)} disabled={props.disabled || props.completed} />
                </span>
                <span className="px-2">
                    <DeleteButton onClick={() => props.onDelete(props.id)} disabled={props.disabled} />
                </span>
            </span>
        </li>
    );
}

export default memo(Item);