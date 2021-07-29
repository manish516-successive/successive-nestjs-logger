import { Module, DynamicModule } from "@nestjs/common";
import { LoggerCoreModule } from "./logger.core.module";

@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    return {
      module: LoggerModule
      imports: [LoggerCoreModule.forRoot(params)]
    };
  }
}