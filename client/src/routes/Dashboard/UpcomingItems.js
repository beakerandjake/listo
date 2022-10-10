import {
  ListItemsContext,
  ListItemsDispatchContext,
  listItemsReducer,
} from 'context/ListItemsContext';
import {
  sidebarItemsActions,
  useSidebarItemsDispatch,
} from 'context/SidebarItemsContext';
import { useEffect, useReducer } from 'react';
import { GroupedItemsDisplay } from 'routes/List/GroupedItemsDisplay';
import { itemSortingFields, sortingDirections } from 'services/sorting';

/**
 * Shows items across all lists which are due soon.
 * @param {object} props
 */
export const UpcomingItems = ({ items: initialItems }) => {
  const [items, listItemsDispatch] = useReducer(listItemsReducer, initialItems);
  const sidebarItemsDispatch = useSidebarItemsDispatch();

  // any time the items change, dispatch updates to the sidebar items context.
  useEffect(() => {
    // group the items by list id and calculate the active item count.
    const groups = items.reduce((acc, value) => {
      const key = `list_${value.listId}`;

      if (!acc[key]) {
        acc[key] = { id: value.listId, itemCount: 0 };
      }

      if (!value.completed) {
        acc[key].itemCount += 1;
      }

      return acc;
    }, {});

    // dispatch a sidebar update for each list
    Object.values(groups).forEach((group) => {
      sidebarItemsDispatch({
        type: sidebarItemsActions.update,
        ...group,
      });
    });
  }, [items, sidebarItemsDispatch]);

  return (
    <div>
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h3 className="text-xl font-medium leading-6 text-gray-900">
          Items Due Today
        </h3>
      </div>
      <ListItemsContext.Provider value={items}>
        <ListItemsDispatchContext.Provider value={listItemsDispatch}>
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
