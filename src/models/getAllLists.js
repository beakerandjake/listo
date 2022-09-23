import joi from 'joi';
import { ApplicationError } from '../errors/index.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    getAllListsModel:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        name:
 *          type: string
 *        iconName:
 *          type: string
 *        count:
 *          type: number
 */
const schema = joi.array().items(
  joi.object({
    id: joi.number().required(),
    name: joi.string().required(),
    iconName: joi.string().required(),
    itemCount: joi.number().required(),
  }),
);

/**
   * Parses and validates a model from the data.
   * @param {object} data - The data to parse into the model.
   * @returns {object}
   */
export const getAllListsModel = (data) => {
  const { error, value } = schema.validate(data);

  if (error) {
    throw new ApplicationError(error.message);
  }

  return value;
};
