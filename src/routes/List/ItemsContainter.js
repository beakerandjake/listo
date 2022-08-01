import { useEffect, useState } from "react"
import { CompletedItemsContainer } from "./CompletedItemsContainer";
import { ItemList } from "./ItemList";

export function ItemsContainer(props) {
    const [pendingItems, setPendingItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);

    useEffect(() => {
        const result = props.items.reduce((acc, current) => {
            if (!current.completed) {
                acc[0].push(current);
            } else {
                acc[1].push(current);
            }

            return acc;
        }, [[], []]);

        setPendingItems(result[0]);
        setCompletedItems(result[1]);
    }, [props.items]);

    return (
        <div>
            <ItemList items={pendingItems} onSetItemCompleted={props.onSetItemCompleted} onClickItem={props.onClickItem} />
            {completedItems.length > 0 && (
                <CompletedItemsContainer count={completedItems.length}>
                    <ItemList items={completedItems} onSetItemCompleted={props.onSetItemCompleted} onClickItem={props.onClickItem} />
                </CompletedItemsContainer>
            )}
        </div>
    )
}