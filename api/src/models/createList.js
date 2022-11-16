import joi from 'joi';
import { parseRequestModel } from './applyJoiSchema.js';
import { listIconNameSchema, listNameSchema } from './list.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    createListModel:
 *      type: object
 *      properties:
 *        name:
 *          $ref: "#components/schemas/listName"
 *        iconName:
 *          $ref: "#components/schemas/listIconName"
 */
const schema = joi.object({
  name: listNameSchema.required(),
  iconName: listIconNameSchema.required(),
});

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const createListModel = (data) => parseRequestModel(data, schema, 'createListModel');
