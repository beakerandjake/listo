import joi from 'joi';
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
  const value = joi.attempt(list, schema);

  // don't allow duplicate named lists to be created.
  if (listRepository.existsWithName(value.name)) {
    throw new Error('A list with that name already exists');
  }

  console.log('result', value);
  // validate model
  // does list already exist with this name?
  // insert list
  // return id
  return { id: 1 };
};
