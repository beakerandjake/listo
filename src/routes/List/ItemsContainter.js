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
        <div className="flex-grow flex-col relative -mt-3">
            <div className="absolute inset-0 overflow-y-auto pt-3 -mx-4 px-4 -mb-4 pb-2 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8">
                    <ItemList items={pendingItems} onSetItemCompleted={props.onSetItemCompleted} onClickItem={props.onClickItem} />
                <CompletedItemsContainer
                    count={completedItems.length}
                    onSetAllItemsCompleted={() => props.onSetItemsCompleted(completedItems.map(x => x.id), false)}
                    onDeleteAllItems={() => props.onDeleteItems(completedItems.map(x => x.id))}
                >
                    <ItemList items={completedItems} onSetItemCompleted={props.onSetItemCompleted} onClickItem={props.onClickItem} />
                </CompletedItemsContainer>
            </div>
        </div>
    )
}