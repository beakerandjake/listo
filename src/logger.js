import { createLogger, format, transports } from 'winston';
import config from './config.js';

export const logger = createLogger({
  level: config.logging.level,
  format: format.combine(
    format.prettyPrint(),
    format.timestamp(),
    format.splat(),
    format.errors({ stack: true }),
    format.json(),
  ),
  // TODO Add file sink for production
});

// log to console in development.
if (config.environment !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.simple(),
      format.colorize({ all: true }),
    ),
  }));
}
