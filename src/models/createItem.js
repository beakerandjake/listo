import joi from 'joi';
import { parseRequestModel } from './applyJoiSchema.js';
import {
  itemDueDateSchema, itemNameSchema, itemNoteSchema, itemQuantitySchema,
} from './item.js';
import { listIdSchema } from './listId.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    createItemRequestModel:
 *      type: object
 *      properties:
 *        name:
 *          required: true
 *          $ref: "#components/schemas/itemName"
 *        quantity:
 *          $ref: "#components/schemas/itemQuantity"
 *          required: false
 *        note:
 *          $ref: "#components/schemas/itemNote"
 *        dueDate:
 *          $ref: "#components/schemas/itemDueDate"
 */
const schema = joi.object({
  listId: listIdSchema.required(),
  name: itemNameSchema.required(),
  quantity: itemQuantitySchema,
  note: itemNoteSchema,
  dueDate: itemDueDateSchema,
});

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const createItemRequestModel = (data) => parseRequestModel(data, schema, 'createItemRequestModel');
