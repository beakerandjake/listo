import { createContext, useContext } from 'react';

const ListItemsDispatchContext = createContext(() => {});

/**
 * Context which allows actions to be dispatched to the listItemsReducer.
 */
export const useListItemsDispatch = () => useContext(ListItemsDispatchContext);
