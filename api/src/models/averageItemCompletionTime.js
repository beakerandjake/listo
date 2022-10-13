import joi from 'joi';
import { parseResponseModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    averageItemCompletionTime:
 *      type: object
 *      properties:
 *        timeInMs:
 *          type: number
 */
const schema = joi.object({
  timeInMs: joi.number().required(),
});

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const averageItemCompletionTime = (data) => parseResponseModel(data, schema, 'averageItemCompletionTime');
