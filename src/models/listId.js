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
export const listIdSchema = joi.number()
  .min(0)
  .required()
  .label('listId');

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {number}
 */
export const listIdModel = (data) => parseRequestModel(data, listIdSchema, 'listIdModel');
