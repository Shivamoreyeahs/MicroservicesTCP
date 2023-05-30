// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { ProductModule } from './product.module';

// async function bootstrap() {
//   const app = await NestFactory.create(ProductModule);
//   await app.listen(3001);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { Transport, TcpOptions } from '@nestjs/microservices';

// import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProductModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3003,
    },
  } as TcpOptions);
 await app.listen();
}
bootstrap();
