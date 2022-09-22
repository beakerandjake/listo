import joi from 'joi';

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
  const value = joi.attempt(list, schema);
  console.log('result', value);
  // validate model
  // does list already exist with this name?
  // insert list
  // return id
  return { id: 1 };
};
