import joi from 'joi';
import { parseRequestModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    listIdModel:
 *      type: number
 *      minimum: 0
 */
const schema = joi.number()
  .min(0)
  .required();

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const listIdModel = (data) => parseRequestModel(data, schema, 'listIdModel');
