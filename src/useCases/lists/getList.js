import { listRepository } from '../../repositories/index.js';
import { listModel, listIdModel } from '../../models/index.js';
import { NotFoundError } from '../../errors/index.js';
import { logger } from '../../logger.js';

/**
 * Returns the list wit the given id
 * @param {number} - The id of the list to return
 * @returns {object}
 */
export const getList = (id) => {
  logger.info('getting list: %s', id);

  const listId = listIdModel(id);
  const result = listRepository.getList(listId);

  if (!result) {
    throw new NotFoundError(`Could not find list with id: ${listId}.`);
  }

  logger.info('got list: %d', result.id);

  return listModel(result);
};
