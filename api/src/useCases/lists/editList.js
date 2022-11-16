import { ConflictError } from '../../errors/index.js';
import { logger } from '../../logger.js';
import { createListModel, listModel } from '../../models/index.js';
import { listRepository } from '../../repositories/index.js';

/**
 * Attempts to create a new list.
 * @param {number} id - The id of list to edit.
 * @param {object} changes - Object containing the new values to apply to the list.
 * @returns {object} The edited list.
 */
export const editList = (id, changes) => {
  logger.info('editing list: %s with changes: %s', id, changes);

  //   const requestModel = createListModel({ name, iconName });

  //   if (listRepository.existsWithName(requestModel.name)) {
  //     throw new ConflictError('A list with that name already exists');
  //   }

  //   const newListId = listRepository.createList(requestModel);
  //   const newList = listRepository.getList(newListId);

  //   logger.info('edited list: %s', itemId);

  //   return listModel(newList);

  return {};
};
