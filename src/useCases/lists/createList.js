import { ConflictError } from '../../errors/index.js';
import { logger } from '../../logger.js';
import { createListRequestModel, createListModel } from '../../models/index.js';
import { listRepository } from '../../repositories/index.js';

/**
 * Attempts to create a new list.
 * @param {object} data - The information needed to create the list.
 * @returns {object} - An object containing the id of the newly created list.
 */
export const createList = ({ name, iconName }) => {
  logger.info('attempting to create list: %s', { name, iconName });

  const requestModel = createListRequestModel({ name, iconName });

  if (listRepository.existsWithName(requestModel.name)) {
    throw new ConflictError('A list with that name already exists');
  }

  const result = listRepository.createList(requestModel);

  return createListModel(result);
};
