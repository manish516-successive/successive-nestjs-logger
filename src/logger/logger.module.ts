import { Module, DynamicModule } from "@nestjs/common";
import { LoggerCoreModule } from "./logger.core.module";
import { LoggerInterface } from "./logger.interface"

@Module({})
export class LoggerModule {
  static forRoot(params: LoggerInterface): DynamicModule {
    return {
      module: LoggerModule,
      imports: [LoggerCoreModule.forRoot(params)]
    };
  }
}