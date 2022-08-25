import { useEffect, useState } from "react";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from 'classnames';
import { ListItem } from "./ListItem";
import { ListCompletedItemsCollapsible } from "./ListCompletedItemsCollapsible";
import { FadeAndPopIn } from "components/Transition";
import { Flipped, Flipper, spring } from "react-flip-toolkit";

const COMPLETED_ITEMS_CONTAINER_FLIP_ID = 'completed';

/**
 * Display indicating that the list is empty.
 */
const NoItemsDisplay = () => {
    return (
        <FadeAndPopIn in={true} appear>
            <div className="w-full py-5 flex flex-col justify-center items-center gap-2 select-none">
                <FontAwesomeIcon icon={faCat} size="4x" className="text-gray-400" />
                <h1 className="text-2xl font-bold text-gray-500">List Is Empty!</h1>
                <h3 className="text-md font-semibold text-gray-400">Add some Items to get started.</h3>
            </div>
        </FadeAndPopIn>
    )
};

// Callback invoked by react-flip-toolkit, lerps the opacity from 0 to 1 while a Flipped Element is appearing.
const fadeFlippedElementIn = (el, index) => spring({
    onUpdate: val => {
        el.style.opacity = val;
    },
    delay: index * 50
});

/**
 * Wraps a ListItem in a Flipped and applies common flip behaviors. 
 * @param {Object} props
 * @param {Object} props.item - The item to render.
 * @param {function} props.onClick - Callback invoked when the user clicks on the item.
 * @param {function} props.onChange - Callback invoked when the user has made changes to the item.
 */
const FlippedListItem = ({
    item,
    onClick,
    onChange,
    ...props
}) => {
    return (
        <Flipped
            {...props}
            flipId={item.id}
            spring="stiff"
            onAppear={fadeFlippedElementIn}
        >
            <ListItem item={item} onClick={onClick} onItemChange={onChange} />
        </Flipped>
    );
};

/**
 * Returns all of the items marked as completed.
 * @param {array} items - The items to filter.
 */
const filterCompleteItems = items => items?.filter(x => x.completed) || [];

/**
 * Returns all of the items not marked as completed.
 * @param {array} items - The items to filter.
 */
const filterIncompleteItems = items => items?.filter(x => !x.completed) || [];

/**
 * Generates a key for use with the Flipper component.
 * @param {array} incompleteItems - The items not yet completed.
 * @param {array} completedItems - The items marked as completed.
 * @returns {string}
 */
const generateFlipKey = (incompleteItems = [], completedItems = []) => (
    [
        ...incompleteItems.map(x => x.id),
        completedItems.length > 0 && COMPLETED_ITEMS_CONTAINER_FLIP_ID,
        ...completedItems.map(x => x.id)
    ].filter(Boolean).join('')
);

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
    const [incompleteItems, setIncompleteItems] = useState(filterIncompleteItems(items));
    const [completeItems, setCompleteItems] = useState(filterCompleteItems(items));
    const [flipKey, setFlipKey] = useState(generateFlipKey(incompleteItems, completeItems));

    // Any time our items list changes, divide the items into completed / pending
    useEffect(() => {
        const newIncomplete = filterIncompleteItems(items);
        const newComplete = filterCompleteItems(items);

        setIncompleteItems(newIncomplete);
        setCompleteItems(newComplete);

        setFlipKey(generateFlipKey(newIncomplete, newComplete));
    }, [items]);

    if (items?.length <= 0) {
        return <NoItemsDisplay />;
    }

    const incompleteFlipped = incompleteItems.map(x => (
        <FlippedListItem
            key={x.id}
            item={x}
            onClick={() => onItemSelected(x.id)}
            onChange={changes => onItemsChange([{ id: x.id, changes }])}
        />
    ));

    const completeFlipped = completeItems.length > 0 && (
        <Flipped
            key={COMPLETED_ITEMS_CONTAINER_FLIP_ID}
            flipId={COMPLETED_ITEMS_CONTAINER_FLIP_ID}
            onAppear={fadeFlippedElementIn}
            translate
            opacity
            scale={false}
        >
            <div>
                <ListCompletedItemsCollapsible
                    onSetItemsIncomplete={() => onItemsChange(completeItems.map(x => ({ id: x.id, changes: { completed: false } })))}
                    onDeleteAllItems={() => onDeleteItems(completeItems.map(x => x.id))}
                >
                    {completeItems.map(x => (
                        <FlippedListItem
                            key={x.id}
                            item={x}
                            onClick={() => onItemSelected(x.id)}
                            onChange={changes => onItemsChange([{ id: x.id, changes }])}
                        />
                    ))}
                </ListCompletedItemsCollapsible>
            </div>
        </Flipped>
    );

    return (
        <div className="flex-grow flex-col relative -mt-3">
            <div
                className={cx(
                    'absolute inset-0 overflow-y-auto pt-3',
                    '-mx-3 -mb-3 px-3 pb-3 sm:-mx-6 sm:-mb-6 sm:px-6 sm:pb-6 md:-mx-8 md:-mb-8 md:px-8 md:pb-8'
                )}
            >
                <Flipper flipKey={flipKey}>
                    <div className="w-full flex flex-col gap-2">
                        {[...incompleteFlipped, completeFlipped].filter(Boolean)}
                    </div>
                </Flipper>
            </div>
        </div>
    )
};