import { ApplicationError, BadRequestError } from '../errors/index.js';
import { logger } from '../logger.js';

/* eslint-disable max-len */

/**
 * Applies a joi schema to the data, returning the generated model or throwing an error.
 * @param {object} data - The data to parse into the model.
 * @param {Schema} schema - The joi schema to apply to the model.
 * @param {string} modelName - The name of the model that is being generated.
 * @param {Error} ErrorType - The error type to instantiate if validation of the model fails.
 * @returns {object}
 */
const apply = (data, schema, modelName, ErrorType) => {
  logger.debug('creating %s from: %s', modelName, data);

  const { error, value } = schema.validate(data);

  if (error) {
    throw new ErrorType(error.message);
  }

  logger.debug('created %s: %s', modelName, value);

  return value;
};

/**
 * Applies a joi schema to the data, returning the generated model or throwing an error.
 * Used to generate models from user data which will pass into the system.
 * @param {object} data - The data to parse into the model.
 * @param {Schema} schema - The joi schema to apply to the model.
 * @param {string} modelName - The name of the model that is being generated.
 * @returns {object}
 */
export const parseRequestModel = (data, schema, modelName) => apply(data, schema, modelName, BadRequestError);

/**
 * Applies a joi schema to the data, returning the generated model or throwing an error.
 * Used to generate models from system data which will be returned to the user.
 * @param {object} data - The data to parse into the model.
 * @param {Schema} schema - The joi schema to apply to the model.
 * @param {string} modelName - The name of the model that is being generated.
 * @returns {object}
 */
export const parseResponseModel = (data, schema, modelName) => apply(data, schema, modelName, ApplicationError);
