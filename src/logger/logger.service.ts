import { LoggerService as NestJsLoggerService } from '@nestjs/common';
import { getValue } from "express-ctx";
import { LOGGER_KEY } from "./logger.constants";


export class LoggerService implements NestJsLoggerService {
  log(message: string) {
    getValue(LOGGER_KEY).info(message);
  }
  error(message: string, trace: string) {
    getValue(LOGGER_KEY).error(message, trace);
  }
  warn(message: string) {
   getValue(LOGGER_KEY).warn(message);
  }
  debug(message: string) {
    getValue(LOGGER_KEY).debug(message);
  }
  verbose(message: string) {
   getValue(LOGGER_KEY).verbose(message);
  }
}

