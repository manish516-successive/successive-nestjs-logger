import { DynamicModule, NestModule, MiddlewareConsumer } from "@nestjs/common";
export declare class LoggerModule implements NestModule {
    static forRoot(): DynamicModule;
    configure(consumer: MiddlewareConsumer): void;
}
