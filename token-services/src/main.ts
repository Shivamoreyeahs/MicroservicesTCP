// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { TokenModule } from './token.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

// import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TokenModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3002,
    },
  } as TcpOptions);
 await app.listen();
}
bootstrap();
