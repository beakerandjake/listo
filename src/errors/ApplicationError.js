export class ApplicationError extends Error {
  constructor(message = 'Unexpected Exception. Please Try Again.', status = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = status;
  }
}
