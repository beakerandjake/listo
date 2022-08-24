import { useEffect, useState } from "react";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from 'classnames';
import { ListItem } from "./ListItem";
import { ListCompletedItemsCollapsible } from "./ListCompletedItemsCollapsible";
import { FadeAndPopIn } from "components/Transition";

/**
 * Display indicating that the list is empty.
 */
const NoItemsDisplay = () => {
    return (
        <div className=" w-full py-5 flex flex-col justify-center items-center gap-2 select-none">
            <FontAwesomeIcon icon={faCat} size="4x" className="text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-500">List Is Empty!</h1>
            <h3 className="text-md font-semibold text-gray-400">Add some Items to get started.</h3>
        </div>
    )
};

/**
 * Renders an array of items.
 * @param {Object} props
 * @param {array} props.items - The items to render.
 * @param {function} props.onItemSelected - Callback invoked when the user clicks on an item.
 * @param {function} props.onItemChange - Callback invoked when the user has made changes to an item.
 */
const Items = ({
    items,
    onItemSelected,
    onItemChange
}) => {
    return (
        <ul className="w-full space-y-2">
            {items.map(x => (
                <ListItem
                    key={x.id}
                    item={x}
                    onClick={() => onItemSelected(x.id)}
                    onItemChange={changes => onItemChange({ id: x.id, changes })}
                />
            ))}
        </ul>
    );
}

const getCompleteItems = items => items?.filter(x => x.completed) || [];
const getIncompleteItems = items => items?.filter(x => !x.completed) || [];

/**
 * Renders the items of a list. Divides items between complete and incomplete.
 * @param {Object} props
 * @param {array} props.items - The items to render.
 * @param {function} props.onItemSelected - Callback invoked when the user clicks on an item.
 * @param {function} props.onItemsChange - Callback invoked when the user has made changes to one or more items.
 * @param {function} props.onDeleteItems - Callback invoked when the user wants to delete one or more items.
 */
export const ListItems = ({
    items,
    onItemSelected,
    onItemsChange,
    onDeleteItems
}) => {
    const [incompleteItems, setIncompleteItems] = useState(getIncompleteItems(items));
    const [completeItems, setCompleteItems] = useState(getCompleteItems(items));

    // Any time our items list changes, divide the items into completed / pending
    useEffect(() => {
        setIncompleteItems(getIncompleteItems(items));
        setCompleteItems(getCompleteItems(items));
    }, [items]);

    if (items?.length <= 0) {
        return (
            <FadeAndPopIn in={true} appear>
                <div>
                    <NoItemsDisplay />
                </div>
            </FadeAndPopIn>
        );
    }

    return (
        <div className="flex-grow flex-col relative -mt-3">
            <div
                className={cx(
                    'absolute inset-0 overflow-y-auto pt-3',
                    '-mx-3 -mb-3 px-3 pb-3 sm:-mx-6 sm:-mb-6 sm:px-6 sm:pb-6 md:-mx-8 md:-mb-8 md:px-8 md:pb-8'
                )}
            >
                {/* Incomplete Items */}
                <Items
                    items={incompleteItems}
                    onItemSelected={onItemSelected}
                    onItemChange={changes => onItemsChange([changes])}
                />
                {/* Completed Items */}
                <ListCompletedItemsCollapsible
                    count={completeItems.length}
                    onSetItemsIncomplete={() => onItemsChange(completeItems.map(x => ({ id: x.id, changes: { completed: false } })))}
                    onDeleteAllItems={() => onDeleteItems(completeItems.map(x => x.id))}
                >
                    <Items
                        items={completeItems}
                        onItemSelected={onItemSelected}
                        onItemChange={changes => onItemsChange([changes])}
                    />
                </ListCompletedItemsCollapsible>
            </div>
        </div>
    )
};