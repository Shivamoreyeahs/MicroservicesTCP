import { Global, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.Schema'
import { ProductController } from './product.controller';
import { ProductService } from './services/product.services';
@Global()
@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0:27017',{dbName: 'ProductDB'}),
  MongooseModule.forFeature([{ name: 'Product', schema:ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {
  
}