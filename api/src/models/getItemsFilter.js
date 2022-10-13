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
 *        - next-seven-days
 */
export const filters = {
  overdue: 'overdue',
  dueToday: 'due-today',
  nextSevenDays: 'next-seven-days',
};

const schema = joi.string()
  .valid(...Object.values(filters))
  .required()
  .label('filter');

export const getItemsFilter = (data) => parseRequestModel(data, schema, 'getItemsFilter');
