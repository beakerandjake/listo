import joi from 'joi';
import config from '../config.js';
import { logger } from '../logger.js';
import { ApplicationError, BadRequestError } from '../errors/index.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    createListRequestModel:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        iconName:
 *          type: string
 */
const requestSchema = joi.object({
  name: joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(config.validation.inputCharactersRegex)
    .required(),

  iconName: joi.string()
    .trim()
    .min(3)
    .max(100)
    .pattern(/^[\w-]+$/)
    .required(),
});

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const createListRequestModel = ({ name, iconName }) => {
  logger.debug('create createListRequestModel from: %s', { name, iconName });

  const { error, value } = requestSchema.validate({ name, iconName });

  if (error) {
    throw new BadRequestError(error.message);
  }

  return value;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    createListModel:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 */
const responseSchema = joi.object({
  id: joi.number()
    .min(0)
    .required(),
});

/**
   * Parses and validates a model from the data.
   * @param {object} data - The data to parse into the model.
   * @returns {object}
   */
export const createListModel = (id) => {
  logger.debug('create createListModel from: %s', { id });

  const { error, value } = responseSchema.validate({ id });

  if (error) {
    throw new ApplicationError(error.message);
  }

  logger.debug('created createListModel: %s', value);

  return value;
};
