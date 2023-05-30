import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { IProduct } from '../interfaces/product.interface';
import { Model } from "mongoose";

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private ProductModel: Model<IProduct>,
    ) { }

    async createProduct(createProductDto: CreateProductDto ): Promise<object> {
        console.log(createProductDto, 'req.body');
        try {
            const user = createProductDto;
            console.log(user);


            const newProduct = new this.ProductModel(createProductDto);
            const newProductSave = await newProduct.save();
            // throw new HttpException({success:false, message:""}, HttpStatus.BAD_REQUEST)
            console.log(newProductSave );
            return {
                success: "true",
                message: "Product created successfully",
                data: newProductSave 
            }
        }
        catch (err) {
            throw new HttpException({ success: false, message: err }, HttpStatus.BAD_REQUEST)
        }
    }
    
  
  
    async deleteProduct(productname: string): Promise<object> {
        console.log(productname, 'productname');
        try {
            const deletedProduct = await this.ProductModel.findOneAndDelete({ productname });
            console.log(deletedProduct, 'deletedproduct');
            if (!deletedProduct) {
                throw new NotFoundException(`Customer #${productname} not found`);
            }
            else {
                return {
                    success: true,
                    message: "user deleted successfully",
                    data: deletedProduct
                };
            }
        }
        catch (err) {
            throw new HttpException({ success: false, message: err }, HttpStatus.BAD_REQUEST)
        }
    }


    // async updateStudent(studentId: string, UpdateEmployeeDto: UpdateEmployeeDto): Promise<IEmployee> {
    //     const existingStudent = await this.EmployeeModel.findByIdAndUpdate(studentId, UpdateEmployeeDto, { new: true });
    //     if (!existingStudent) {
    //         throw new NotFoundException(`Student #${studentId} not found`);
    //     }
    //     return existingStudent;
    // }


    async getAllProduct(): Promise<IProduct[]> {
        const productData = await this.ProductModel.find();
        if (!productData || productData.length == 0) {
            throw new NotFoundException('Students data not found!');
        }
        return productData;
    }

    async getProduct(productId: string): Promise<IProduct> {
        const existingProduct = await this.ProductModel.findById(productId).exec();
        if (!existingProduct) {
            throw new NotFoundException(`Student #${productId} not found`);
        }
        return existingProduct;
    }


    // async deleteStudent(studentId: string): Promise<IEmployee> {
    //     const deletedStudent = await this.EmployeeModel.findByIdAndDelete(studentId);
    //     if (!deletedStudent) {
    //         throw new NotFoundException(`Student #${studentId} not found`);
    //     }
    //     return deletedStudent;
    // }
}