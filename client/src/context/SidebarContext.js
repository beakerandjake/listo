import { createContext, useContext, useReducer } from 'react';

export const sidebarItemsActions = {
  increment: 'SIDEBAR_INCREMENT_LIST_ITEM_COUNT',
  decrement: 'SIDEBAR_DECREMENT_LIST_ITEM_COUNT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case sidebarItemsActions.increment:
      return state.map((x) =>
        x.id === action.id
          ? { ...x, itemCount: x.itemCount + action.amount }
          : x
      );
    case sidebarItemsActions.decrement:
      return state.map((x) =>
        x.id === action.id
          ? { ...x, itemCount: x.itemCount - action.amount }
          : x
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
