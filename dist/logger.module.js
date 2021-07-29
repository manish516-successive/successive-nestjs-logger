"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const pinoHttp = require("pino-http");
const pino = require("pino");
const uuid_1 = require("uuid");
const express_ctx_1 = require("express-ctx");
const logger_service_1 = require("./logger.service");
const logger_constants_1 = require("./logger.constants");
const logger_middleware_1 = require("./logger.middleware");
const core_1 = require("@nestjs/core");
const logger_interceptor_1 = require("./logger.interceptor");
let LoggerModule = LoggerModule_1 = class LoggerModule {
    static forRoot() {
        return {
            module: LoggerModule_1,
            providers: [logger_service_1.LoggerService, {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: logger_interceptor_1.LoggerInterceptor,
                }],
            exports: [logger_service_1.LoggerService]
        };
    }
    configure(consumer) {
        consumer.apply(express_ctx_1.middleware, pinoHttp({
            level: process.env.DEBUG_LOGS,
            logger: pino(),
            autoLogging: process.env.AUTO_LOGGING === 'true',
            genReqId: function (req) { return uuid_1.v4(); },
            serializers: {
                req(req) {
                    req.headers = Object.assign(req.raw.headers, {
                        "X-Sub-Correlation-Id": uuid_1.v4(),
                        "X-Correlation-Id": req.raw.headers["X-Correlation-Id"] ? req.raw.headers["X-Correlation-Id"] : uuid_1.v4()
                    });
                    req.body = req.raw.body;
                    return req;
                },
            },
        }), bindLoggerMiddleware, logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
LoggerModule = LoggerModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({ providers: [logger_service_1.LoggerService], exports: [logger_service_1.LoggerService] })
], LoggerModule);
exports.LoggerModule = LoggerModule;
function bindLoggerMiddleware(req, _res, next) {
    express_ctx_1.setValue(logger_constants_1.LOGGER_KEY, req.log);
    next();
}
//# sourceMappingURL=logger.module.js.map