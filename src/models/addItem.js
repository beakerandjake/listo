import joi from 'joi';
import config from '../config.js';
import { ApplicationError, BadRequestError } from '../errors/index.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    createItemRequestModel:
 *      type: object
 *      properties:
 *        listId:
 *          type: number
 *          required: true
 *          default: 1
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
const requestModelSchema = joi.object({
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
export const addItemRequestModel = ({
  listId, name, quantity, note, dueDate,
}) => {
  const { error, value } = requestModelSchema.validate({
    listId, name, quantity, note, dueDate,
  });

  if (error) {
    throw new BadRequestError(error.message);
  }

  return value;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    createItemResponseModel:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        listId:
 *          type: number
 *        name:
 *          type: string
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
 */
// id, listId, name, dueDate, quantity, note, createdDate
const responseModelSchema = joi.object({
  id: joi.number().required(),
  listId: joi.number().required(),
  name: joi.string().required(),
  quantity: joi.number().required(),
  note: joi.string().required(),
  dueDate: joi.string().required(),
  createdDate: joi.string().required(),
});

/**
 * Parses and validates a model from the data.
 * @param {object} data - The data to parse into the model.
 * @returns {object}
 */
export const addItemResponseModel = (data) => {
  const { error, value } = responseModelSchema.validate(data);

  if (error) {
    throw new ApplicationError(error.message);
  }

  return value;
};
