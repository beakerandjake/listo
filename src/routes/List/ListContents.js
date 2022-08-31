import { PillGroup } from "components/PillGroup";
import { useEffect, useState } from "react";
import { ListItems } from "./ListItems";

/**
 * Returns all of the items marked as completed.
 * @param {array} items - The items to filter.
 */
const filterCompletedItems = items => items?.filter(x => x.completed) || [];

/**
 * Returns all of the items not marked as completed.
 * @param {array} items - The items to filter.
 */
const filterIncompleteItems = items => items?.filter(x => !x.completed) || [];

/**
 * Renders the items of a list. Divides items between completed and incomplete.
 * @param {Object} props
 * @param {array} props.items - All of the items in the list
 * @param {function} props.onItemSelected - Callback invoked when the user clicks on an item.
 * @param {function} props.onItemsChange - Callback invoked when the user has made changes to one or more items.
 * @param {function} props.onDeleteItems - Callback invoked when the user wants to delete one or more items.
 */
export const ListContents = ({
    items,
    onItemSelected,
    onItemsChange,
    onDeleteItems
}) => {
    const [incompleteItems, setIncompleteItems] = useState(filterIncompleteItems(items));
    const [completedItems, setCompletedItems] = useState(filterCompletedItems(items));

    // Any time our items list changes, divide the items into completed / incomplete
    useEffect(() => {
        const newIncomplete = filterIncompleteItems(items);
        const newCompleted = filterCompletedItems(items);

        setIncompleteItems(newIncomplete);
        setCompletedItems(newCompleted);

        // setFlipKey(generateFlipKey(newIncomplete, newCompleted));
    }, [items]);

    return (
        <>

            <ListItems
                items={incompleteItems}
                onItemSelected={onItemSelected}
                onItemChange={(id, changes) => onItemsChange([{ id, changes }])}
            />
        </>
    );
};