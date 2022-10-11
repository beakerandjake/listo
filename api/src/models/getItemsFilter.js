import joi from 'joi';
import { parseRequestModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    getItemsFilter:
 *      type: string
 *      enum:
 *        - overdue
 *        - due-today
 */
export const filters = {
  overdue: 'overdue',
  dueToday: 'due-today',
};

const schema = joi.string()
  .valid(...Object.values(filters))
  .required();

export const getItemsFilter = (data) => parseRequestModel(data, schema, 'getItemsFilter');
