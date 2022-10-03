import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import config from 'config';

export const logger = createLogger({
  level: config.get('logging').level,
  format: format.combine(
    format.timestamp(),
    format.splat(),
    format.errors({ stack: true }),
    format.json(),
  ),
});

// log to console in development.
if (config.util.getEnv('NODE_ENV') !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.simple(),
      format.colorize({ all: true }),
    ),
  }));
}

// log to file in production.
if (config.util.getEnv('NODE_ENV') === 'production') {
  logger.add(new transports.DailyRotateFile({
    filename: 'listo-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }));
}
