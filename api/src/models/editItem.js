import joi from 'joi';
import { parseRequestModel } from './applyJoiSchema.js';
import {
  itemDueDateSchema, itemNoteSchema, itemQuantitySchema, itemIdSchema, itemCompletedSchema,
} from './item.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    editItemModel:
 *      type: object
 *      properties:
 *        completed:
 *          $ref: "#components/schemas/itemCompleted"
 *        quantity:
 *          $ref: "#components/schemas/itemQuantity"
 *        note:
 *          $ref: "#components/schemas/itemNote"
 *        dueDate:
 *          $ref: "#components/schemas/itemDueDate"
 */
const schema = joi
  .object({
    id: itemIdSchema.required(),
    quantity: itemQuantitySchema,
    completed: itemCompletedSchema,
    note: itemNoteSchema,
    dueDate: itemDueDateSchema,
  })
  .label('edits')
  .or('quantity', 'completed', 'note', 'dueDate'); // Require at least one item property to be present.

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const editItemModel = (data) => parseRequestModel(data, schema, 'editItemModel');
