import joi from 'joi';
import { ValidationError } from '../errors/index.js';

const schema = joi.object({
  listId: joi.number()
    .min(0)
    .required(),

  name: joi.string()
    .alphanum()
    .trim()
    .min(2)
    .max(50)
    .required(),

  quantity: joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(1),

  note: joi.string()
    .allow('', null)
    .empty(['', null])
    .default('')
    .trim()
    .max(500),

  dueDate: joi.string()
    .isoDate(),
});

/**
 * Parses and validates a addItem model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const buildAddItem = ({
  listId, name, quantity, note, dueDate,
}) => {
  const { error, value } = schema.validate({
    listId, name, quantity, note, dueDate,
  });

  if (error) {
    throw new ValidationError(error.message);
  }

  return value;
};
