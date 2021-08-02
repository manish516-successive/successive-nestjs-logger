# successive-nestjs-logger

It is HTTP JSON Logger based on pino-http for Nest Js. It prints log on each request initiation , on each error and on each request completion with X-Sub-Correlation-Id and X-Correlation-Id. It also exposes a service to print custom logs at different levels (log, error, warn. debug and verbose).

- [Installation](#installation)
- [Examples](#examples)

### Installation
```
npm i successive-nestjs-logger --save
```

### Examples

- Include logger module in root/app module to print log on each request initiation , on each error and on each request completion with X-Sub-Correlation-Id and X-Correlation-Id. It accepts a debug_logs parameter to enable/disable debug logs.
  
  ```
  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { LoggerModule } from 'successive-nestjs-logger';

  @Module({
    imports: [LoggerModule.forRoot({
      debug_logs: true
    })],
    controllers: [AppController],
    providers: [AppService],
  })

  export class AppModule  {}

  
  {"level":30,"time":1627877768457,"pid":27844,"hostname":"my-host","req":{"id":"c9108341-6faa-4913-93ec-527ed2a61ecc","method":"GET","url":"/users","query":{},"params":{},"headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.28.1","accept":"*/*","postman-token":"573f1a94-b633-4dee-995d-2f33d05992c5","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"19","X-Sub-Correlation-Id":"95ccd6a9-78c7-4c99-9522-b2608c6de1bb","X-Correlation-Id":"278718dc-ba33-411f-aba2-97905e699ffc"},"remoteAddress":"::1","remotePort":47440,"body":{},"msg":"request started"}
  
  {"level":30,"time":1627877768468,"pid":27844,"hostname":"my-host","req":{"id":"c9108341-6faa-4913-93ec-527ed2a61ecc","method":"GET","url":"/users","query":{},"params":{},"headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.28.1","accept":"*/*","postman-token":"573f1a94-b633-4dee-995d-2f33d05992c5","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"19","X-Sub-Correlation-Id":"95ccd6a9-78c7-4c99-9522-b2608c6de1bb","X-Correlation-Id":"278718dc-ba33-411f-aba2-97905e699ffc"},"remoteAddress":"::1","remotePort":47440,"body":{},"res":{"statusCode":200,"headers":{"x-powered-by":"Express","x-correlation-id":"278718dc-ba33-411f-aba2-97905e699ffc","content-type":"text/html; charset=utf-8","content-length":"23","etag":"W/\"17-dz3lQFWsvaILP0XWy2YesfdbyNA\""}},"responseTime":11,"msg":"request completed"}
  ```
  
- Include Logger service to print custom logs at different levels.
 
  ```
  import { LoggerService } from 'successive-nestjs-logger'

  @Controller('employee')
  export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService,
      private readonly loggerService: LoggerService) {}

    @Get()
    async getEmployees(): Promise<Employee[]> {
      try{
        this.loggerService.debug("This is debug log");
        this.loggerService.info("This is information log");
        this.loggerService.warn("This is warning log");
        return await this.employeeService.findAll();
      }catch(err){
        throw new InternalServerErrorException(err);
      } 
    }
   } 
  {"level":20,"time":1627881419365,"pid":45993,"hostname":"my-host","req":{"id":"1515e5d9-2c1d-4eaa-ad0a-69a1b73d870b","method":"GET","url":"/users","query":{},"params":{},"headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.28.1","accept":"*/*","postman-token":"4a1709bf-aac1-49a4-9fd9-be99fef456f6","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"19","X-Sub-Correlation-Id":"4650d5ee-2422-4908-8391-839802b5ba84","X-Correlation-Id":"6de4f4de-1b8e-44c1-973d-b176ed2cf836"},"remoteAddress":"::1","remotePort":48314,"body":{}},"msg":"This is a debug log"}
  
  {"level":30,"time":1627881419365,"pid":45993,"hostname":"my-host","req":{"id":"1515e5d9-2c1d-4eaa-ad0a-69a1b73d870b","method":"GET","url":"/users","query":{},"params":{},"headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.28.1","accept":"*/*","postman-token":"4a1709bf-aac1-49a4-9fd9-be99fef456f6","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"19","X-Sub-Correlation-Id":"4650d5ee-2422-4908-8391-839802b5ba84","X-Correlation-Id":"6de4f4de-1b8e-44c1-973d-b176ed2cf836"},"remoteAddress":"::1","remotePort":48314,"body":{}},"msg":"This is a info log"}
  
  {"level":40,"time":1627881419365,"pid":45993,"hostname":"my-host","req":{"id":"1515e5d9-2c1d-4eaa-ad0a-69a1b73d870b","method":"GET","url":"/users","query":{},"params":{},"headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.28.1","accept":"*/*","postman-token":"4a1709bf-aac1-49a4-9fd9-be99fef456f6","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-length":"19","X-Sub-Correlation-Id":"4650d5ee-2422-4908-8391-839802b5ba84","X-Correlation-Id":"6de4f4de-1b8e-44c1-973d-b176ed2cf836"},"remoteAddress":"::1","remotePort":48314,"body":{}},"msg":"This is a warning log"}
  ```
 
 
 
