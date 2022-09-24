import joi from 'joi';
import { parseRequestModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    itemIdModel:
 *      type: number
 *      minimum: 0
 */
export const itemIdSchema = joi.number()
  .min(0)
  .required()
  .label('itemId');

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {number}
 */
export const itemIdModel = (data) => parseRequestModel(data, itemIdSchema, 'itemIdModel');
