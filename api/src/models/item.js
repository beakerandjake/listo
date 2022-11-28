import joi from 'joi';
import config from 'config';
import {
  isValid, parseISO, startOfDay,
} from 'date-fns';
import { parseRequestModel, parseResponseModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    itemQuantity:
 *      type: number
 *      minimum: 1
 *      maximum: 100
 *      default: 1
 */
export const itemQuantitySchema = joi.number()
  .integer()
  .min(1)
  .max(100);

/**
 * @openapi
 * components:
 *  schemas:
 *    itemNote:
 *      type: string
 *      default: ''
 */
export const itemNoteSchema = joi.string()
  .allow('', null)
  .trim()
  .max(500);

/**
 * @openapi
 * components:
 *  schemas:
 *    itemDueDate:
 *      type: string
 *      format: date-time
 */
export const itemDueDateSchema = joi.string()
  .allow('', null)
  .isoDate()
  .custom((value, helpers) => {
    const date = parseISO(value);

    if (!isValid(date)) {
      return helpers.message('Value was not a Date');
    }

    // ensure due date is always at the start of the day.
    return startOfDay(date).toISOString();
  });

/**
 * @openapi
 * components:
 *  schemas:
 *    itemId:
 *      type: number
 *      minimum: 0
 */
export const itemIdSchema = joi.number()
  .min(0)
  .label('itemId');

/**
 * @openapi
 * components:
 *  schemas:
 *    itemName:
 *      type: string
 *      minimum: 2
 *      maximum: 50
 */
export const itemNameSchema = joi.string()
  .trim()
  .min(2)
  .max(50)
  .pattern(new RegExp(config.get('validation.inputCharactersRegex')));

/**
 * @openapi
 * components:
 *  schemas:
 *    itemCompleted:
 *      type: boolean
 */
export const itemCompletedSchema = joi.boolean();

/**
 * @openapi
 * components:
 *  schemas:
 *    itemModel:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        listId:
 *          type: number
 *        name:
 *          type: string
 *        completed:
 *          type: boolean
 *        quantity:
 *          type: number
 *        note:
 *          type: string
 *        dueDate:
 *          type: string
 *          format: date-time
 *        createdDate:
 *          type: string
 *          format: date-time
 *        completedDate:
 *          type: string
 *          format: date-time
 */

// Item will be created from data in the database.
// So validation isn't as important as when coming from user data.
const itemModelSchema = joi.object({
  id: joi.number().required(),
  listId: joi.number().required(),
  name: joi.string().required(),
  completed: joi.bool().default((x) => !!x.completedDate),
  quantity: joi.number(),
  note: joi.string().allow('', null),
  dueDate: joi.string().allow('', null),
  createdDate: joi.string().required(),
  completedDate: joi.string().allow('', null),
});

/**
   * Parses and validates a model from the data.
   * @param {object} data - The data to parse into the model.
   * @returns {object}
   */
export const itemModel = (data) => parseResponseModel(data, itemModelSchema, 'itemModel');

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {number}
 */
export const itemIdModel = (data) => parseRequestModel(data, itemIdSchema, 'itemIdModel');
