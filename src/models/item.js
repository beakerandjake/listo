import joi from 'joi';
import { ApplicationError } from '../errors/index.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    itemModel:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        listId:
 *          type: number
 *        name:
 *          type: string
 *        completed:
 *          type: boolean
 *        quantity:
 *          type: number
 *        note:
 *          type: string
 *        dueDate:
 *          type: string
 *          format: date-time
 *        createdDate:
 *          type: string
 *          format: date-time
 *        completedDate:
 *          type: string
 *          format: date-time
 */
const schema = joi.object({
  id: joi.number().required(),
  listId: joi.number().required(),
  name: joi.string().required(),
  completed: joi.bool().default((x) => !!x.completedDate),
  quantity: joi.number(),
  note: joi.string().allow('', null),
  dueDate: joi.string().allow('', null),
  createdDate: joi.string().required(),
  completedDate: joi.string().allow('', null),
});

/**
   * Parses and validates a model from the data.
   * @param {object} data - The data to parse into the model.
   * @returns {object}
   */
export const itemModel = (data) => {
  const { error, value } = schema.validate(data);

  if (error) {
    throw new ApplicationError(error.message);
  }

  return value;
};
