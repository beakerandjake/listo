import { deleteItemsModel } from '../../models/index.js';

export const deleteItems = (listId, filter) => {
  const deleteModel = deleteItemsModel({ listId, filter });

  console.log('delete', deleteModel);
};
