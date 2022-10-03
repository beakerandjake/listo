import joi from 'joi';
import config from 'config';
import { parseRequestModel, parseResponseModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    createListRequestModel:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        iconName:
 *          type: string
 */
const requestSchema = joi.object({
  name: joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(new RegExp(config.get('validation').inputCharactersRegex))
    .required(),

  iconName: joi.string()
    .trim()
    .min(3)
    .max(100)
    .pattern(/^[\w-]+$/)
    .required(),
});

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const createListRequestModel = (data) => parseRequestModel(data, requestSchema, 'createListRequestModel');

/**
 * @openapi
 * components:
 *  schemas:
 *    createListModel:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 */
const responseSchema = joi.object({
  id: joi.number().required(),
});

/**
   * Parses and validates a model from the data.
   * @param {object} data - The data to parse into the model.
   * @returns {object}
   */
export const createListModel = (data) => parseResponseModel(data, responseSchema, 'createListModel');
