import { ApplicationError } from './ApplicationError.js';

export class BadRequestError extends ApplicationError {
  constructor(message) {
    super(message || 'Bad Request', 400);
  }
}
