import { ConflictError, NotFoundError } from '../../errors/index.js';
import { logger } from '../../logger.js';
import {
  editListModel, listIdModel, listModel,
} from '../../models/index.js';
import { listRepository } from '../../repositories/index.js';

/**
 * Attempts to create a new list.
 * @param {number} id - The id of list to edit.
 * @param {object} changes - Object containing the new values to apply to the list.
 * @returns {object} The edited list.
 */
export const editList = (id, changes) => {
  logger.info('editing list: %s with changes: %s', id, changes);

  const listId = listIdModel(id);
  const changesModel = editListModel(changes);

  // if the user is editing the name, ensure it's not a conflict.
  if (changes.name && listRepository.existsWithName(changesModel.name)) {
    throw new ConflictError('A list with that name already exists');
  }

  const success = listRepository.editList(listId, changesModel);

  if (!success) {
    throw new NotFoundError(`Could not find a List with id: ${listId}`);
  }

  logger.info('edited list: %s', listId);

  return listModel(listRepository.getList(listId));
};
