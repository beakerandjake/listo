import {
  ListItemsContext,
  ListItemsDispatchContext,
  listItemsReducer,
} from 'context/ListItemsContext';
import { useReducer } from 'react';
import { Items } from 'routes/List/Items';

/**
 * Shows items across all lists which are due soon.
 * @param {object} props
 */
export const UpcomingItems = ({ items: initialItems }) => {
  const [items, listItemsDispatch] = useReducer(listItemsReducer, initialItems);

  return (
    <div>
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h3 className="text-xl font-medium leading-6 text-gray-900">
          Items Due Today
        </h3>
      </div>
      <ListItemsContext.Provider value={items}>
        <ListItemsDispatchContext.Provider value={listItemsDispatch}>
          <Items items={items} />
        </ListItemsDispatchContext.Provider>
      </ListItemsContext.Provider>
    </div>
  );
};
