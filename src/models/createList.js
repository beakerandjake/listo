import joi from 'joi';
import { ValidationError } from '../errors/index.js';

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
 * @returns {object}
 */
export const buildCreateList = ({ name, iconName }) => {
  const { error, value } = schema.validate({ name, iconName });

  if (error) {
    throw new ValidationError(error.message);
  }

  return value;
};
