import { ApplicationError } from './ApplicationError.js';

export class ValidationError extends ApplicationError {
  constructor(message) {
    super(message || 'Bad Request', 400);
  }
}
