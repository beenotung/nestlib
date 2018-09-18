import {Controller, Get, Module} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {startApp} from '../src/start';

@Controller()
class AppController {
  @Get()
  root(): string {
    return 'ok';
  }
}

@Module({
  controllers: [AppController]
})
class AppModule {
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await startApp(app, {
    port: 3000,
    cors: true
  });
}
bootstrap();
