import React, { memo } from "react";
import QuantityButton from "./QuantityButton";
import DeleteButton from './DeleteButton';

function Item(props) {

    const toggleCompleted = () => {
        if (props.disabled) {
            return;
        }

        props.onToggleCompleted(props.id, !props.completed);
    }

    console.log('render', props.name);
    return (
        <li className="flex flex-start gap-1 items-center px-4 py-3 md:px-0">
            <span className="grow-0">
                <input
                    type="checkbox"
                    className="focus:ring-green-500 h-4 w-4 text-green-700 border-gray-300 rounded-full cursor-pointer"
                    checked={props.completed}
                    onChange={toggleCompleted}
                />
            </span>
            <p className={'px-2 w-full cursor-pointer  ' + (props.completed ? 'line-through opacity-50' : '')} onClick={toggleCompleted}>
                {props.name}
            </p>
            <span className="grow-0 flex justify-between items-center gap-3">
                <QuantityButton quantity={props.quantity} onQuantityChange={quantity => props.onQuantityChange(props.id, quantity)} disabled={props.disabled || props.completed} />
                <DeleteButton onClick={() => props.onDelete(props.id)} disabled={props.disabled} />
            </span>
        </li>
    );
}

export default memo(Item);