import joi from 'joi';
import { BadRequestError } from '../errors/index.js';

const schema = joi.object({
  listId: joi.number()
    .min(0)
    .required(),

  filter: joi.string()
    .valid('completed', 'active'),
});

export const deleteItemsModel = ({ listId, filter }) => {
  const { error, value } = schema.validate({ listId, filter });

  if (error) {
    throw new BadRequestError(error.message);
  }

  return value;
};
