import joi from 'joi';
import config from '../config.js';
import { parseRequestModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    createItemRequestModel:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          required: true
 *          default: 'example item name'
 *        quantity:
 *          type: number
 *          required: false
 *          default: 1
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
  listId: joi.number()
    .min(0)
    .required(),

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
export const createItemRequestModel = (data) => parseRequestModel(data, schema, 'createItemRequestModel');
