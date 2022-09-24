import joi from 'joi';
import { parseRequestModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    deleteItemsFilter:
 *      type: string
 *      enum:
 *        - completed
 *        - active
 */

export const filters = {
  completed: 'completed',
  active: 'active',
};

const schema = joi.object({
  listId: joi.number()
    .min(0)
    .required(),

  filter: joi.string()
    .valid(...Object.values(filters)),
});

export const deleteItemsModel = (data) => parseRequestModel(data, schema, 'deleteItemsModel');
