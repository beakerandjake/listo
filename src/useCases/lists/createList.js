import { ConflictError } from '../../errors/index.js';
import { buildCreateList } from '../../models/index.js';
import { listRepository } from '../../repositories/index.js';

/**
 * Attempts to create a new list.
 * @param {object} data - The information needed to create the list.
 * @returns {object} - An object containing the id of the newly created list.
 */
export const createList = ({ name, iconName }) => {
  const createListModel = buildCreateList({ name, iconName });

  // don't allow duplicate named lists to be created.
  if (listRepository.existsWithName(createListModel.name)) {
    throw new ConflictError('A list with that name already exists');
  }

  // insert the new list into the database.
  const result = listRepository.createList(createListModel);

  return { id: result };
};
