const winston = require('winston');

const { combine, timestamp, printf } = winston.format;
const logLocation = require('app-root-path').resolve('/log');
// console.log(logLocation);

// meta param is ensured by splat()
// eslint-disable-next-line no-shadow
const myFormat = printf(({ timestamp, level, message }) => `{'${timestamp} [${level}]' : '${message}'}`);

const options = {
  file_info: {
    level: 'info',
    handleExceptions: true,
    filename: `${logLocation}/info/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    json: true,
    format: combine(timestamp(), myFormat),
    colorize: false,
    maxFiles: '14d',
  },
  file_error: {
    level: 'error',
    handleExceptions: true,
    filename: `${logLocation}/error/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    json: true,
    format: combine(timestamp(), myFormat),
    colorize: false,
    maxFiles: '14d',
  },
  console_debug: {
    level: 'debug',
    handleExceptions: true,
    datePattern: 'YYYY-MM-DD',
    json: true,
    format: combine(timestamp(), myFormat),
    colorize: true,
  },
};

const DailyRotateFile = require('winston-daily-rotate-file');

const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.file_info),
    new DailyRotateFile(options.file_error),
    new winston.transports.Console(options.console_debug),
  ],
});

logger.streamInfo = {
  write(message, encoding) {
    logger.info(message);
  },
};

logger.streamError = {
  write(message, encoding) {
    logger.error(message);
  },
};

logger.streamDebug = {
  write(message, encoding) {
    logger.debug(message);
  },
};

module.exports = logger;
