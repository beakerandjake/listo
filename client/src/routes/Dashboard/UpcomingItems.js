import {
  listItemsActions,
  ListItemsContext,
  ListItemsDispatchContext,
  listItemsReducer,
} from 'context/ListItemsContext';
import {
  sidebarItemsActions,
  useSidebarItemsDispatch,
} from 'context/SidebarItemsContext';
import { useCallback, useEffect, useReducer } from 'react';
import { GroupedItemsDisplay } from 'routes/List/GroupedItemsDisplay';
import { itemSortingFields, sortingDirections } from 'services/sorting';

/**
 * Shows items across all lists which are due soon.
 * @param {object} props
 */
export const UpcomingItems = ({ items: initialItems }) => {
  const [items, listItemsDispatch] = useReducer(listItemsReducer, initialItems);
  const sidebarItemsDispatch = useSidebarItemsDispatch();

  // create wrapper around the listItemsDispatch function 
  const listItemsDispatchWrapper = useCallback(
    (arg) => {
      // whenever the user edits the completed status of the item
      // dispatch sidebarItems action to update the active item count
      // of that list in the sidebar. 
      if (arg.type === listItemsActions.edit) {
        sidebarItemsDispatch({
          id: arg.item.listId,
          type: arg.item.completed
            ? sidebarItemsActions.increment
            : sidebarItemsActions.decrement,
          value: 1,
        });
      }

      listItemsDispatch(arg);
    },
    [listItemsDispatch, sidebarItemsDispatch]
  );

  return (
    <div>
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h3 className="text-xl font-medium leading-6 text-gray-900">
          Items Due Today
        </h3>
      </div>
      <ListItemsContext.Provider value={items}>
        <ListItemsDispatchContext.Provider value={listItemsDispatchWrapper}>
          <GroupedItemsDisplay
            sortingDirection={sortingDirections.asc}
            sortingKey={itemSortingFields.dueDate}
            items={items}
          />
        </ListItemsDispatchContext.Provider>
      </ListItemsContext.Provider>
    </div>
  );
};
