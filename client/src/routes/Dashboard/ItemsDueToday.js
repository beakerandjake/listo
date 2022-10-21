import { useCallback, useMemo, useReducer } from 'react';
import { faCalendarDay } from '@fortawesome/pro-regular-svg-icons';
import {
  ListItemsContext,
  ListItemsDispatchContext,
  listItemsReducer,
} from 'context/ListItemsContext';
import { useUpdateSidebarItems } from 'context/SidebarItemsContext';
import { GroupedItemsDisplay } from 'routes/List/GroupedItemsDisplay';
import { NoItemsDisplay } from 'routes/List/NoItemsDisplay';
import { itemSortingFields, sortingDirections } from 'services/sorting';
import { CollapsibleSection } from './CollapsibleSection';
import { ItemCard } from './ItemCard';

/**
 * Shows items across all lists which are due soon.
 * @param {object} props
 * @param {object[]} props.items - The items which are due today.
 * @param {function} props.onItemCompleted - Callback invoked when the user changes an items completed status.
 */
export const ItemsDueToday = ({
  items: initialItems = [],
  onItemCompleted = () => {},
}) => {
  const [items, listItemsDispatch] = useReducer(listItemsReducer, initialItems);
  const sidebarItemsDispatch = useUpdateSidebarItems();

  // create wrapper around the listItemsDispatch function
  // to also dispatch updates to the sidebar to keep the
  // active item count in sync whenever list items change.
  const listItemsDispatchWrapper = useCallback(
    (arg) => {
      listItemsDispatch(arg);
      sidebarItemsDispatch();
      onItemCompleted();
    },
    [listItemsDispatch, sidebarItemsDispatch, onItemCompleted]
  );

  // calculate the number of active items any time the items change.
  const activeCount = useMemo(
    () => items.filter((x) => !x.completed).length,
    [items]
  );

  return (
    <ItemCard
      itemCount={activeCount}
      title="Due Today"
      emptyDisplay={
        <NoItemsDisplay icon={faCalendarDay} heading="No Items Due Today!" />
      }
    >
      <ListItemsContext.Provider value={items}>
        <ListItemsDispatchContext.Provider value={listItemsDispatchWrapper}>
          <GroupedItemsDisplay
            sortingDirection={sortingDirections.asc}
            sortingKey={itemSortingFields.dueDate}
            items={items}
            noItemsDisplay={
              <NoItemsDisplay
                icon={faCalendarDay}
                heading="No Items Due Today!"
              />
            }
          />
        </ListItemsDispatchContext.Provider>
      </ListItemsContext.Provider>
    </ItemCard>
  );
};
