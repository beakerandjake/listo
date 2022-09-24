import joi from 'joi';
import config from '../config.js';
import { parseRequestModel } from './applyJoiSchema.js';
import { itemIdSchema } from './itemId.js';

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
const schema = joi.object({
  id: itemIdSchema,

  name: joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(config.validation.inputCharactersRegex)
    .required(),

  quantity: joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(1),

  note: joi.string()
    .allow('', null)
    .trim()
    .max(500),

  dueDate: joi.string()
    .allow('', null)
    .isoDate(),
});

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const editItemModel = (data) => parseRequestModel(data, schema, 'editItemModel');
