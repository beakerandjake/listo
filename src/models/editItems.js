import joi from 'joi';
import { parseRequestModel } from './applyJoiSchema.js';
import { itemCompletedSchema } from './item.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    editItemsModel:
 *      type: object
 *      properties:
 *        completed:
 *          $ref: "#components/schemas/itemCompleted"
 */
const schema = joi.object({
  completed: itemCompletedSchema.required(),
});

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const editItemsModel = (data) => parseRequestModel(data, schema, 'editItemsModel');
