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
import { useCallback, useReducer } from 'react';
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
  // to also dispatch updates to the sidebar to keep the
  // active item count in sync.
  const listItemsDispatchWrapper = useCallback(
    (arg) => {
    // assuming that any changes dispatched by children will be
    // setting the completed flag, if children start to edit more than that
    // this will need additional logic to detect if the edit was actually
    // modifying completed or not.
      if (arg.type === listItemsActions.edit) {
        sidebarItemsDispatch({
          id: arg.item.listId,
          type: arg.item.completed
            ? sidebarItemsActions.decrement
            : sidebarItemsActions.increment,
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
