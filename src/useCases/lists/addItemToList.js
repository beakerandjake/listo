import { buildAddItem } from '../../models/index.js';

export const addItemToList = (listId, item) => {
  const addModel = buildAddItem({ listId, ...item });

  console.log('add item to list', addModel);
  return { id: 50 };
};
