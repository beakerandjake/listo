import { useEffect, useState } from "react"
import { CompletedItemsContainer } from "./CompletedItemsContainer";
import { ItemList } from "./ItemList";

export function ItemsContainer(props) {
    const [pendingItems, setPendingItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);

    // Any time our items list changes, divide the items into completed / pending
    useEffect(() => {
        setPendingItems(props.items.filter(x => !x.completed));
        setCompletedItems(props.items.filter(x => x.completed));
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