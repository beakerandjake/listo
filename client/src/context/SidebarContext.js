import { createContext, useContext, useReducer } from 'react';

export const sidebarItemsActions = {
  update: 'SIDEBAR_UPDATE_LIST_ITEM_COUNT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case sidebarItemsActions.update:
      const match = state.find((x) => x.id === action.id);

      // bail out of change if id is bad or itemCount is unchanged.
      if (!match || match.itemCount === action.itemCount) {
        return state;
      }

      // update the item count for the specified list.
      return state.map((x) =>
        x.id === action.id ? { ...x, itemCount: action.itemCount } : x
      );
    default:
      return state;
  }
};

const SidebarItemsContext = createContext([]);
const SidebarItemsDispatchContext = createContext(() => {});

export const SidebarItemsProvider = ({ children, initialItems = [] }) => {
  const [items, dispatch] = useReducer(reducer, initialItems);

  return (
    <SidebarItemsContext.Provider value={items}>
      <SidebarItemsDispatchContext.Provider value={dispatch}>
        {children}
      </SidebarItemsDispatchContext.Provider>
    </SidebarItemsContext.Provider>
  );
};

export const useSidebarItems = () => useContext(SidebarItemsContext);
export const useSidebarItemsDispatch = () =>
  useContext(SidebarItemsDispatchContext);
