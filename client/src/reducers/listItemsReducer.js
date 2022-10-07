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
