import { itemApi } from 'api';
import { createContext, useCallback, useContext } from 'react';
import { useErrorHandler } from 'react-error-boundary';

/**
 * Defines all of the actions supported by the reducer.
 */
export const listItemsActions = {
  add: 'LIST_ITEMS_ADD',
  edit: 'LIST_ITEMS_EDIT',
  delete: 'LIST_ITEMS_DELETE',
  deleteAll: 'LIST_ITEMS_DELETE_ALL',
  deleteCompleted: 'LIST_ITEMS_DELETE_COMPLETED',
  replace: 'LIST_ITEMS_REPLACE',
};

/**
 * Perform actions on the items array.
 */
export const listItemsReducer = (state, action) => {
  switch (action.type) {
    case listItemsActions.add:
      // if an item with that id already exists, update that item instead.
      if (state.find((x) => x.id === action.item.id)) {
        return listItemsReducer(state, {
          type: listItemsActions.edit,
          item: action.item,
        });
      }

      return [...state, action.item];
    case listItemsActions.edit:
      return state.map((x) => (x.id === action.item.id ? action.item : x));
    case listItemsActions.delete:
      return state.filter((x) => x.id !== action.id);
    case listItemsActions.deleteAll:
      return [];
    case listItemsActions.deleteCompleted:
      return state.filter((x) => !x.completed);
    case listItemsActions.replace:
      return action.items || [];
    default:
      return state;
  }
};

export const ListItemsDispatchContext = createContext(() => {});
export const ListItemsContext = createContext([]);

/**
 * Context which allows actions to be dispatched to the listItemsReducer.
 */
export const useListItemsDispatch = () => useContext(ListItemsDispatchContext);

/**
 * Context which provides access to the List items.
 */
export const useListItems = () => useContext(ListItemsContext);

/**
 * Wrapper around useListItemsDispatch.
 * Calls the API to apply the changes to an item,
 * When API changes are returned an 'edit' will be dispatched
 * to update the List Item with the edited value.
 */
export const useEditListItem = () => {
  const dispatch = useListItemsDispatch();
  const handleError = useErrorHandler();

  return useCallback(
    (id, changes) =>
      itemApi
        .editItem(id, changes)
        .then((result) =>
          dispatch({ type: listItemsActions.edit, item: result })
        )
        .catch(handleError),
    [dispatch, handleError]
  );
};
