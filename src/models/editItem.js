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
 *          type: boolean
 *          required: false
 *          default: false
 *        quantity:
 *          type: number
 *          required: false
 *          default: 1
 *          minimum: 1
 *        note:
 *          type: string
 *          required: false
 *          default: ''
 *        dueDate:
 *          type: string
 *          format: date-time
 *          required: false
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
