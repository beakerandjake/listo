import { createContext, useContext } from 'react';

export const SidebarItemsContext = createContext([]);
export const UpdateSidebarItemsContext = createContext(() => {});

export const useSidebarItems = () => useContext(SidebarItemsContext);
export const useUpdateSidebarItems = () =>
  useContext(UpdateSidebarItemsContext);
