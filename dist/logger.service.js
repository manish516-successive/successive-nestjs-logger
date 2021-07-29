"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const express_ctx_1 = require("express-ctx");
const logger_constants_1 = require("./logger.constants");
class LoggerService {
    log(message) {
        express_ctx_1.getValue(logger_constants_1.LOGGER_KEY).info(message);
    }
    error(message, trace) {
        express_ctx_1.getValue(logger_constants_1.LOGGER_KEY).error(message, trace);
    }
    warn(message) {
        express_ctx_1.getValue(logger_constants_1.LOGGER_KEY).warn(message);
    }
    debug(message) {
        express_ctx_1.getValue(logger_constants_1.LOGGER_KEY).debug(message);
    }
    verbose(message) {
        express_ctx_1.getValue(logger_constants_1.LOGGER_KEY).verbose(message);
    }
}
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map