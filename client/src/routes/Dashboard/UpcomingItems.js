import {
  ListItemsContext,
  ListItemsDispatchContext,
  listItemsReducer,
} from 'context/ListItemsContext';
import { useUpdateSidebarItems } from 'context/SidebarItemsContext';
import { useCallback, useReducer } from 'react';
import { GroupedItemsDisplay } from 'routes/List/GroupedItemsDisplay';
import { itemSortingFields, sortingDirections } from 'services/sorting';

/**
 * Shows items across all lists which are due soon.
 * @param {object} props
 * @param {object[]} props.items - The items which are due today.
 * @param {function} props.onItemChange - Callback invoked when the user changes an item.
 */
export const UpcomingItems = ({ items: initialItems, onItemChange }) => {
  const [items, listItemsDispatch] = useReducer(listItemsReducer, initialItems);
  const sidebarItemsDispatch = useUpdateSidebarItems();

  // create wrapper around the listItemsDispatch function
  // to also dispatch updates to the sidebar to keep the
  // active item count in sync whenever list items change.
  const listItemsDispatchWrapper = useCallback(
    (arg) => {
      listItemsDispatch(arg);
      sidebarItemsDispatch();
      onItemChange();
    },
    [listItemsDispatch, sidebarItemsDispatch, onItemChange]
  );

  return (
    <ListItemsContext.Provider value={items}>
      <ListItemsDispatchContext.Provider value={listItemsDispatchWrapper}>
        <GroupedItemsDisplay
          sortingDirection={sortingDirections.asc}
          sortingKey={itemSortingFields.dueDate}
          items={items}
        />
      </ListItemsDispatchContext.Provider>
    </ListItemsContext.Provider>
  );
};
