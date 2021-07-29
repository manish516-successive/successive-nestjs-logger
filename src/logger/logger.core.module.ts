import { Global, Module, DynamicModule, NestModule, MiddlewareConsumer} from "@nestjs/common";
import * as express from "express";
import * as pinoHttp from "pino-http";
import * as pino from "pino";
import { v4 } from "uuid";
import { setValue, middleware as ctxMiddleware } from "express-ctx";
import { LoggerService } from "./logger.service";
import { LOGGER_KEY, DEBUG_LOGS, AUTO_LOGGING } from "./logger.constants";
import { LoggerMiddleware } from "./logger.middleware"
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './logger.interceptor'



@Global()
@Module({ providers: [LoggerService], exports: [LoggerService] })
export class LoggerCoreModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: LoggerCoreModule,
      providers: [LoggerService, {
        provide: APP_INTERCEPTOR,
        useClass: LoggerInterceptor,
      }],
      exports: [LoggerService]
    };
  }

  configure(consumer: MiddlewareConsumer, ) {
   consumer.apply(ctxMiddleware, pinoHttp({
      level: DEBUG_LOGS,
      logger: pino(),
      autoLogging: AUTO_LOGGING,
      genReqId: function (req) { return v4() },
      serializers: {
        req(req) {
          req.headers = Object.assign(req.raw.headers, {
            "X-Sub-Correlation-Id": v4(),
            "X-Correlation-Id": req.raw.headers["X-Correlation-Id"] ? req.raw.headers["X-Correlation-Id"] : v4()
          })
          req.body = req.raw.body;
          return req;
        },
      },
    }), bindLoggerMiddleware, LoggerMiddleware).forRoutes('*');
  }
}


function bindLoggerMiddleware(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) {
  setValue(LOGGER_KEY, req.log);
  next();
}
