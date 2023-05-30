import { Global, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.Schema'
import { UserController } from './user.controller';
import { CustomerService } from './services/user.service';
import { JwtModule } from '@nestjs/jwt';
@Global()
@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0:27017',{dbName: 'CustomerDB'}),
  MongooseModule.forFeature([{ name: 'Customer', schema:CustomerSchema }]),
  JwtModule.register({
    global: true,
    secret: "My Token",
    signOptions: { expiresIn: '30 minutes' },
  })
 ],
  controllers: [UserController],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class UserModule {
  
}