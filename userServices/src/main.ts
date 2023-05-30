// import { NestFactory } from '@nestjs/core';
// import { UserModule } from './user.module';

// async function bootstrap() {
//   const app = await NestFactory.create(UserModule);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

// import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    },
  } as TcpOptions);
 await app.listen();
}
bootstrap();