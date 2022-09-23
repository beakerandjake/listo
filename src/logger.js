import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import config from './config.js';

export const logger = createLogger({
  level: config.logging.level,
  format: format.combine(
    format.timestamp(),
    format.splat(),
    format.errors({ stack: true }),
    format.json(),
  ),
});

// log to console in development.
if (config.environment !== 'production') {
  const simple = format.simple();
  const pretty = format.prettyPrint();

  // default to simple format unless error, then pretty print for easy stack track reading.
  const customFormat = format((info, opts) => {
    if (info.level === 'error') {
      return pretty.transform(info, opts);
    }

    return simple.transform(info, opts);
  });

  logger.add(new transports.Console({
    format: format.combine(
      customFormat(),
      format.colorize({ all: true }),
    ),
  }));
}

// log to file in production.
if (config.environment === 'production') {
  logger.add(new transports.DailyRotateFile({
    filename: 'listo-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }));
}
