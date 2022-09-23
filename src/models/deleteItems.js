import joi from 'joi';
import { BadRequestError } from '../errors/index.js';
import { logger } from '../logger.js';

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

export const deleteItemsModel = (data) => {
  logger.debug('creating deleteItemsModel from: %s', data);

  const { error, value } = schema.validate(data);

  if (error) {
    throw new BadRequestError(error.message);
  }

  logger.debug('created deleteItemsModel: %s', value);

  return value;
};
