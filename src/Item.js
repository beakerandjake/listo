import React, { memo } from "react";
import QuantityButton from "./QuantityButton";
import DeleteButton from './DeleteButton';

function Item(props) {
    console.log('render', props.name);
    return (
        <li className="flex justify-between items-baseline px-4 py-3 sm:px-0">
            {props.name}
            <span className="flex justify-between items-baseline divide-x">
                <span className="px-3">
                    <QuantityButton quantity={props.quantity} onQuantityChange={quantity => props.onQuantityChange(props.id, quantity)} disabled={props.disabled} />
                </span>
                <span className="px-3">
                    <DeleteButton onClick={() => props.onDelete(props.id)} disabled={props.disabled} />
                </span>
            </span>
        </li>
    );
}

export default memo(Item);