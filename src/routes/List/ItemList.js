import { Item } from './Item';

export function ItemList(props) {
    const items = props.items.map(item =>
        <Item
            {...item}
            key={item.id}
            onSetItemCompleted={props.onSetItemCompleted}
            onClickItem={props.onClickItem}
        />
    );

    return <ul className="w-full space-y-2">{items}</ul>
}