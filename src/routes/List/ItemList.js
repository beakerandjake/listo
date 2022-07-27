
export function ItemList(props) {
    const items = props.items.map(x => (<div>{x.name}</div>));
    return (
        <div>
            {items}
        </div>
    )
}