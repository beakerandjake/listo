import { useEffect, useState } from 'react';
import { faPartyHorn, faList } from '@fortawesome/pro-light-svg-icons';
import { Badge } from 'components/Badge';
import { Pill, PillGroup } from 'components/PillGroup';
import { NoItemsDisplay } from './NoItemsDisplay';
import { sortItems } from 'services/sorting';
import { FlippedList } from 'components/FlippedList';
import { Item } from './Item';

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
const groupAndSortItems = (items, sortingKey, sortingDirection) =>
  ITEM_GROUPS.map(({ filterFn, ...group }) => ({
    ...group,
    items: sortItems(
      items.filter((x) => filterFn(x)),
      sortingKey,
      sortingDirection
    ),
  }));

/**
 * Renders the items of a list, groups items for easier filtering.
 * @param {Object} props
 * @param {array} props.items - All of the items in the list
 * @param {function} props.onItemSelected - Callback invoked when the user clicks on an item.
 * @param {string} props.sortingKey - The key to sort the items by.
 * @param {string} props.sortingDirection - The direction to sort the items.
 * @param {React.ReactNode} props.noItemsDisplay - What to render when there are no items.
 */
export const GroupedItemsDisplay = ({
  items,
  sortingKey,
  sortingDirection,
  onItemSelected = () => {},
  noItemsDisplay,
}) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [itemGroups, setItemGroups] = useState(
    groupAndSortItems(items, sortingKey, sortingDirection)
  );

  // Any time our items or the sorting changes, re calculate the groups
  useEffect(() => {
    setItemGroups(groupAndSortItems(items, sortingKey, sortingDirection));
  }, [items, sortingKey, sortingDirection]);

  // Render an empty display if all groups are empty.
  if (itemGroups?.every((x) => !x.items.length)) {
    return noItemsDisplay;
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

      <FlippedList className="flex flex-col gap-2">
        {itemGroups[activeGroupIndex].items.map((x) => (
          <Item key={x.id} item={x} onClick={() => onItemSelected(x)} />
        ))}
      </FlippedList>

      {/* Show the groups empty display if it has no items. */}
      {activeGroup.items.length <= 0 && activeGroup.emptyDisplay}
    </div>
  );
};
