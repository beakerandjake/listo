import { NotFoundError } from '../../errors/NotFound.js';
import { deleteItemsModel } from '../../models/index.js';
import { filters } from '../../models/deleteItems.js';
import { itemRepository, listRepository } from '../../repositories/index.js';

export const deleteItems = (listId, filter) => {
  const deleteModel = deleteItemsModel({ listId, filter });

  if (!listRepository.existsWithId(listId)) {
    throw new NotFoundError('List does not exist');
  }

  switch (deleteModel.filter) {
    case filters.completed:
      itemRepository.deleteCompleted(deleteModel.listId);
      break;
    case filters.active:
      itemRepository.deleteActive(deleteModel.listId);
      break;
    default:
      itemRepository.deleteAll(deleteModel.listId);
      break;
  }
};
