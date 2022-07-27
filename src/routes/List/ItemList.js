import { Item } from './Item';

export function ItemList(props) {
    const items = props.items.map(item =>
        <Item
            {...item}
            key={item.id}
            onDelete={props.onDeleteItem}
            onQuantityChange={props.onItemQuantityChange}
            onToggleCompleted={props.onToggleCompleted}
            disabled={props.disabled}
        />
    );

    return <ul className="w-full divide-y divide-gray-200">{items}</ul>
}