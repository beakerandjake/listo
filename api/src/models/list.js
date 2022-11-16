import joi from 'joi';
import config from 'config';
import { parseRequestModel, parseResponseModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    listIdModel:
 *      type: number
 *      minimum: 0
 */
export const listIdSchema = joi.number()
  .min(0)
  .label('listId');

/**
 * @openapi
 * components:
 *  schemas:
 *    listName:
 *      type: string
 *      minimum: 2
 *      maximum: 50
 */
export const listNameSchema = joi.string()
  .trim()
  .min(3)
  .max(50)
  .pattern(new RegExp(config.get('validation.inputCharactersRegex')));

/**
 * @openapi
 * components:
 *  schemas:
 *    listIconName:
 *      type: string
 *      minimum: 3
 *      maximum: 50
 */
export const listIconNameSchema = joi.string()
  .trim()
  .min(3)
  .max(50)
  .pattern(new RegExp(config.get('validation.inputCharactersRegex')));

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {number}
 */
export const listIdModel = (data) => parseRequestModel(data, listIdSchema, 'listIdModel');

/**
 * @openapi
 * components:
 *  schemas:
 *    listModel:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        name:
 *          type: string
 *        iconName:
 *          type: string
 *        count:
 *          type: number
 */
const schema = joi.object({
  id: joi.number().required(),
  name: joi.string().required(),
  iconName: joi.string().required(),
  itemCount: joi.number().required(),
});

/**
   * Parses and validates a model from the data.
   * @param {object} data - The data to parse into the model.
   * @returns {object}
   */
export const listModel = (data) => parseResponseModel(data, schema, 'listModel');
