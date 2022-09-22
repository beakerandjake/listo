import { ApplicationError } from './ApplicationError.js';

export class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message || 'Not Found', 404);
  }
}
