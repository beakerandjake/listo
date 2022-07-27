import { Item } from './Item';

export function ItemList(props) {
    const items = props.items.map(item =>
        <Item
            {...item}
            key={item.id}
            onDelete={props.onDeleteItem}
            onSetItemCompleted={props.onSetItemCompleted}
            // onQuantityChange={props.onItemQuantityChange}
            // disabled={props.disabled}
        />
    );

    return <ul className="w-full divide-y divide-gray-200">{items}</ul>
}