import { useEffect, useState } from 'react';
import { faPartyHorn, faCat, faList } from '@fortawesome/pro-light-svg-icons';
import { Badge } from 'components/Badge';
import { Pill, PillGroup } from 'components/PillGroup';
import { Items } from './Items';
import { NoItemsDisplay } from './NoItemsDisplay';

/**
 * Pill which represents a group of the list items.
 * @param {Object} props
 * @param {string} props.name - The name of the group.
 * @param {number} props.count - How many items are in the group.
 * @param {boolean} props.active - Is this group currently being displayed?
 * @param {function} props.onClick - Callback invoked when the user clicks on the group.
 */
const ListGroupPill = ({ name, count, active, onClick }) => {
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
    filterFn: (x) => !x.completed,
    emptyDisplay: (
      <NoItemsDisplay icon={faPartyHorn} heading="All Items Complete!" />
    ),
  },
  {
    key: 'complete',
    displayName: 'Complete',
    filterFn: (x) => !!x.completed,
    emptyDisplay: <NoItemsDisplay icon={faList} heading="No Items Completed" />,
  },
];

/**
 * Groups items based on the item group config
 * @param {array} items - The items to filter.
 */
const groupItems = (items) =>
  ITEM_GROUPS.map(({ filterFn, ...group }) => ({
    ...group,
    items: items.filter((x) => filterFn(x)),
  }));

/**
 * Renders the items of a list, groups items for easier filtering.
 * @param {Object} props
 * @param {array} props.items - All of the items in the list
 * @param {function} props.onItemSelected - Callback invoked when the user clicks on an item.
 * @param {function} props.onItemChange - Callback invoked when the user has made changes to an item.
 */
export const GroupedItemsDisplay = ({
  items,
  onItemSelected,
  onItemChange,
}) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [itemGroups, setItemGroups] = useState(groupItems(items));

  // Any time our items list changes, group the items into their pill sections
  useEffect(() => {
    setItemGroups(groupItems(items));
  }, [items]);

  // Render an empty display if all groups are empty.
  if (itemGroups?.every((x) => !x.items.length)) {
    return (
      <NoItemsDisplay
        icon={faCat}
        heading="List Is Empty!"
        subHeading="Add some Items to get started."
      />
    );
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

      <Items
        items={itemGroups[activeGroupIndex].items}
        onItemSelected={onItemSelected}
        onItemChange={onItemChange}
      />

      {/* Show the groups empty display if it has no items. */}
      {activeGroup.items.length <= 0 && activeGroup.emptyDisplay}
    </div>
  );
};
