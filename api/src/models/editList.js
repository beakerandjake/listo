import joi from 'joi';
import { parseRequestModel } from './applyJoiSchema.js';
import { listIconNameSchema, listNameSchema } from './list.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    editListModel:
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
})
  .label('edits')
  .or('name', 'iconName'); // Require at least one item property to be present.

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const editListModel = (data) => parseRequestModel(data, schema, 'editListModel');
