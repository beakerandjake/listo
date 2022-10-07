import { createContext } from 'react';

export const SidebarContext = createContext({
  lists: [],
  updateItemCount: () => {},
});
