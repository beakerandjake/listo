import joi from 'joi';
import { BadRequestError, ConflictError } from '../../errors/index.js';
import { listRepository } from '../../repositories/index.js';

/**
 * @typedef CreateList
 * @type {object}
 * @property {string} name - The name of the list to create.
 * @property {string} iconName - The icon name of the list.
 */

/**
 * @type {CreateList}
 */
const schema = joi.object({
  name: joi.string()
    .alphanum()
    .trim()
    .min(3)
    .max(50)
    .required(),

  iconName: joi.string()
    .trim()
    .min(3)
    .max(100)
    .pattern(/^[\w-]+$/)
    .required(),
});

/**
 * Attempts to create a new list.
 * @param {CreateList} list - The information needed to create the list.
 * @returns {object} - An object containing the id of the newly created list.
 */
export const createList = (list) => {
  // validate the schema of the model.
  const { error, value } = schema.validate(list);

  if (error) {
    throw new BadRequestError(error.message);
  }

  // don't allow duplicate named lists to be created.
  if (listRepository.existsWithName(value.name)) {
    throw new ConflictError('A list with that name already exists');
  }

  // insert the new list into the database.
  const result = listRepository.createList(value);

  return { id: result };
};
