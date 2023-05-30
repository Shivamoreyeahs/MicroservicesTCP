
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenController } from './token.controller';
import { TokenService } from './services/token.service';
// import { JwtConfigService } from './services/config/jwt-config.service';
// import { MongoConfigService } from './services/config/mongo-config.service';
import { TokenSchema } from './schemas/token.schema';

@Module({
  imports: [
 MongooseModule.forRoot('mongodb://0.0.0.0:27017',{dbName: 'TokenDB'}),
  MongooseModule.forFeature([{ name: 'Token', schema:TokenSchema }]),
  JwtModule.register({
    global: true,
    secret: "My Token",
    signOptions: { expiresIn: '30 minutes' },
  })
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}