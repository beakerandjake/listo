import { ApplicationError } from './ApplicationError.js';

export class ConflictError extends ApplicationError {
  constructor(message) {
    super(message || 'Conflict Error.', 409);
  }
}
