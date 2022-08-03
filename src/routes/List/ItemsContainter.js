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

            <CompletedItemsContainer
                count={completedItems.length}
                onSetAllItemsCompleted={() => props.onSetItemsCompleted(completedItems.map(x => x.id), false)}
                onDeleteAllItems={() => props.onDeleteItems(completedItems.map(x => x.id))}
            >
                <ItemList items={completedItems} onSetItemCompleted={props.onSetItemCompleted} onClickItem={props.onClickItem} />
            </CompletedItemsContainer>
        </div>
    )
}