import joi from 'joi';
import { ValidationError } from '../errors/index.js';

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
 * Parses and validates a createList model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {CreateList} An object containing the id of the newly created list.
 */
export const buildCreateList = ({ name, iconName }) => {
  // validate the schema of the model.
  const { error, value } = schema.validate({ name, iconName });

  if (error) {
    throw new ValidationError(error.message);
  }

  return value;
};
