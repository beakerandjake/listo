import joi from 'joi';
import { ApplicationError } from '../errors/index.js';


/**
 * @openapi
 * components:
 *  schemas:
 *    createListResponseModel:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 */
const responseSchema = joi.object({
  id: joi.number()
    .min(0)
    .required(),
});

/**
   * Parses and validates a createList response model from the data.
   * @param {object} data - The data to parse into the model.
   * @returns {object}
   */
export const createListResponseModel = ({ id }) => {
  const { error, value } = responseSchema.validate(id);

  if (error) {
    throw new ApplicationError(error.message);
  }

  return value;
};
