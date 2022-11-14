import joi from 'joi';
import config from 'config';
import { parseRequestModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    createListModel:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        iconName:
 *          type: string
 */
const schema = joi.object({
  name: joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(new RegExp(config.get('validation.inputCharactersRegex')))
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
export const createListModel = (data) => parseRequestModel(data, schema, 'createListModel');