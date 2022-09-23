import joi from 'joi';
import { BadRequestError } from '../errors/index.js';

export const filters = {
  completed: 'completed',
  active: 'active',
};

const schema = joi.object({
  listId: joi.number()
    .min(0)
    .required(),

  filter: joi.string()
    .valid(...Object.values(filters)),
});

export const deleteItemsModel = ({ listId, filter }) => {
  const { error, value } = schema.validate({ listId, filter });

  if (error) {
    throw new BadRequestError(error.message);
  }

  return value;
};
