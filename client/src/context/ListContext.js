import { createContext, useContext } from 'react';

/**
 * Defines all of the actions supported by the reducer.
 */
export const listActions = {
  replace: 'LIST_REPLACE',
};

/**
 * Perform actions on the list.
 */
export const listReducer = (state, action) => {
  switch (action.type) {
    case listActions.replace:
      return action.value || {};
    default:
      return state;
  }
};

export const ListDispatchContext = createContext(() => {});
export const ListContext = createContext({});

/**
 * Context which allows actions to be dispatched to the listReducer.
 */
export const useListDispatch = () => useContext(ListDispatchContext);

/**
 * Context which provides access to the List.
 */
export const useList = () => useContext(ListContext);
