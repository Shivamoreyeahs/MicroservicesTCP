import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

import { ProductService } from './services/product.services';
// import { AuthGuard } from './guards/user-auth.guards';
// import { Roles } from './guards/user-roles.decorators';
@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()

  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
 
  
  @Get()

  getEmployees() {
    return this.productService.getAllProduct();
  }

//   @Get('/exactemployees')
 
//   async getEmployeeByemail(@Body('email') Email: string) {
//     return this.customerService.getEmployeeByEmail(Email);
//   }
  @Get('/:id')

  async getEmployee(@Param('id') ProductId: string) {
    return this.productService.getProduct(ProductId);
  }
  
  
  @Delete('/delete')

  async deleteEmployee(@Body('product_name') product_name: string) {
    return this.productService.deleteProduct(product_name);
  }







 



}