import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

import { ApiController } from './user.controller';
// import { TasksController } from './tasks.controller';

// import { AuthGuard } from './services/guards/authorization.guard';
// import { PermissionGuard } from './services/guards/permission.guard';

// import { ConfigService } from './services/config/config.service';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'User_Service', transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3001,
      },
    },
    {
      name: 'Token_Service', transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3002,
      },
    },
    {
      name: 'Product_Service', transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3003,
      },
    },
   
    ])
  ],
  controllers: [ApiController],
  providers:  [ApiController]
})
export class AppModule {}
