import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPartyHorn, faCheckSquare, faCat } from "@fortawesome/pro-light-svg-icons";
import { Badge } from "components/Badge";
import { Pill, PillGroup } from "components/PillGroup";
import { FadeAndPopIn } from "components/Transition";
import { ListItems } from "./ListItems";

/**
 * Used to indicate that a group is empty.
 * @param {Object} props
 * @param {IconDefinition} props.icon - The FontAwesome icon to render.
 * @param {string} props.heading - The message to display.
 * @param {string} props.subHeading - Additional message to display.
 */
const EmptyGroupDisplay = ({
    icon,
    heading,
    subHeading
}) => {
    return (
        <FadeAndPopIn in={true} appear>
            <div className="w-full py-20 flex flex-col justify-center items-center gap-2 select-none">
                <FontAwesomeIcon icon={icon} size="4x" fixedWidth className="text-gray-400" />
                <h1 className="text-2xl font-bold text-gray-500">{heading}</h1>
                <h3 className="text-md font-semibold text-gray-400">{subHeading}</h3>
            </div>
        </FadeAndPopIn>
    );
}

/**
 * Pill which represents a group of the list items.
 * @param {Object} props
 * @param {string} props.name - The name of the group.
 * @param {number} props.count - How many items are in the group.
 * @param {boolean} props.active - Is this group currently being displayed?
 * @param {function} props.onClick - Callback invoked when the user clicks on the group.
 */
const ListGroupPill = ({
    name,
    count,
    active,
    onClick
}) => {
    return (
        <Pill active={active} onClick={onClick}>
            {name}
            <Badge size="lg" variant={active ? 'inverse' : 'default'}>
                {count}
            </Badge>
        </Pill>
    );
};

const ITEM_GROUPS = [
    {
        key: 'active',
        displayName: 'Active',
        filterFn: x => !x.completed,
        emptyDisplay: {
            icon: faPartyHorn,
            heading: 'All Items Complete!'
        }
    },
    {
        key: 'complete',
        displayName: 'Complete',
        filterFn: x => !!x.completed,
        emptyDisplay: {
            icon: faCheckSquare,
            heading: 'No Items Completed'
        }
    }
];

/**
 * Groups items based on the item group config
 * @param {array} items - The items to filter.
 */
const groupItems = (items) => ITEM_GROUPS.map(({ filterFn, ...group }) => ({
    ...group,
    items: items.filter(x => filterFn(x))
}));

/**
 * Renders the items of a list, groups items for easier filtering.
 * @param {Object} props
 * @param {array} props.items - All of the items in the list
 * @param {function} props.onItemSelected - Callback invoked when the user clicks on an item.
 * @param {function} props.onItemsChange - Callback invoked when the user has made changes to one or more items.
 */
export const ListContents = ({
    items,
    onItemSelected,
    onItemsChange
}) => {
    const [activeGroupIndex, setActiveGroupIndex] = useState(0);
    const [itemGroups, setItemGroups] = useState(groupItems(items));

    // Any time our items list changes, group the items into their pill sections
    useEffect(() => {
        setItemGroups(groupItems(items));
    }, [items]);

    // Render if list is completely empty.
    if (items.length <= 0) {
        return (
            <EmptyGroupDisplay
                icon={faCat}
                heading="List Is Empty!"
                subHeading="Add some Items to get started."
            />
        )
    }

    const activeGroup = itemGroups[activeGroupIndex];

    return (
        <div className="flex flex-1 flex-col gap-3">
            <PillGroup>
                {itemGroups.map((group, index) => (
                    <ListGroupPill
                        key={group.key}
                        active={activeGroupIndex === index}
                        count={group.items.length}
                        name={group.displayName}
                        onClick={() => setActiveGroupIndex(index)}
                    />
                ))}
            </PillGroup>

            <ListItems
                items={itemGroups[activeGroupIndex].items}
                onItemSelected={onItemSelected}
                onItemChange={(id, changes) => onItemsChange([{ id, changes }])}
            />

            {activeGroup.items.length <= 0 && <EmptyGroupDisplay {...activeGroup.emptyDisplay} />}
        </div>
    );
};