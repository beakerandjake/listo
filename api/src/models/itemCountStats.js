import joi from 'joi';
import { parseResponseModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    itemCountStats:
 *      type: object
 *      properties:
 *        total:
 *          type: number
 *        active:
 *          type: number
 *        completed:
 *          type: number
 *        overdue:
 *          type: number
 */
const schema = joi.object({
  total: joi.number().required(),
  active: joi.number().required(),
  completed: joi.number().required(),
  overdue: joi.number().required(),
});

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const createItemCountStats = (data) => parseResponseModel(data, schema, 'createItemCountStats');
