import joi from 'joi';
import { parseRequestModel } from './applyJoiSchema.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    getItemsFilter:
 *      type: object
 *      properties:
 *        dueBefore:
 *          type: string
 *          format: date-time
 *        dueAfter:
 *          type: string
 *          format: date-time
 */
const schema = joi
  .object({
    dueBefore: joi.string()
      .allow('', null)
      .isoDate(),
    dueAfter: joi.string()
      .allow('', null)
      .isoDate(),
  })
  .or('dueBefore', 'dueAfter'); // Require at least one item property to be present.

export const getItemsFilter = (data) => parseRequestModel(data, schema, 'getItemsFilter');
