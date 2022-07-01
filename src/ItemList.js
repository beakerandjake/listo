import React from 'react';
import Item from './Item';

export default function ItemList(props) {
    const items = props.items.map(item =>
        <Item
            {...item}
            key={item.id}
            onDelete={props.onDeleteItem}
            onQuantityChange={props.onItemQuantityChange}
            disabled={props.disabled}
        />
    );

    return <ul className="list-disc divide-y">{items}</ul>
}