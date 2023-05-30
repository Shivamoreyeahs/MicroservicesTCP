import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { ICustomer } from '../interfaces/customer.interface';
import { Model } from 'mongoose';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import * as bcrypt from 'bcrypt';
import { loginCustomerDto } from '../dto/login-customer.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private CustomerModel: Model<ICustomer>,
    private jwtService: JwtService,
  ) {}

  async signUp(createCustomerDto: CreateCustomerDto): Promise<object> {
    let result: object;
    console.log(createCustomerDto, 'req.body');
    try {
      const user = createCustomerDto;
      console.log(user);
      const salt = await bcrypt.genSalt();
      console.log(salt, 'salt');
      const hashPassword = await bcrypt.hash(user.password, salt);
      console.log(hashPassword, 'hashPassword');
      user.password = hashPassword;

      const newStudent = new this.CustomerModel(createCustomerDto);
      const newCustomerSave = await newStudent.save();
      console.log(newCustomerSave);
      result = {
        status: HttpStatus.CREATED,
        message: 'user_create_success',
        user: newCustomerSave,
        errors: null,
      };
    } catch (err) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_create_bad_request',
        user: null,
        errors: null,
      };
    }

    return result;
  }
  async login(data: loginCustomerDto): Promise<object> {
    console.log(data, 'email $ password');
    console.log(data.email);
    try {
      const user = await this.CustomerModel.findOne({ email: data.email });
      console.log(user, 'user');
      console.log(user.password, 'user.password');
      if (user) {
        const match = await bcrypt.compare(data.password, user.password);

        // GENERATE THE TOKEN CODE
        // const payload = { username: user.name, sub: user._id };
        // // return {
        // //     access_token: await this.jwtService.signAsync(payload),
        // // };
        //      const generateToken = await this.jwtService.signAsync(payload);
        //      console.log(generateToken, 'generated token');
        if (match) {
          return {
            success: 'true',
            message: 'User login successfully',
          };
        } else {
          throw new HttpException(
            { success: false, message: 'User password is incorrect' },
            HttpStatus.NOT_FOUND,
          );
        }
      } else {
        throw new HttpException(
          { success: false, message: 'User does not exist ' },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err) {
      throw new HttpException(
        { success: false, message: err },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async updateApi(
    CustomerId: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<object> {
    console.log(updateCustomerDto, 'updateCustomerdata');
    console.log(CustomerId, 'email');
    try {
      const updateStudent = await this.CustomerModel.findByIdAndUpdate(
        CustomerId,
        updateCustomerDto,
        { new: false },
      );
      if (!updateStudent) {
        throw new NotFoundException(`Employee #${CustomerId} not found`);
      }
      return {
        success: true,
        message: 'Customer updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getAllEmployee(): Promise<object> {
    try {
      const allCustomerData = await this.CustomerModel.find();
      if (!allCustomerData || allCustomerData.length == 0) {
        throw new NotFoundException('Customer data not found!');
      } else {
        return {
          success: true,
          message: 'The data of all Employees',
          data: allCustomerData,
        };
      }
    } catch (err) {
      throw new HttpException(
        { success: false, message: err },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getEmployeeById(CustomerId: string): Promise<object> {
    console.log(CustomerId, 'emailofCustomer');
    try {
      const existingCustomer = await this.CustomerModel.findById(
        CustomerId,
      ).exec();
      if (!existingCustomer) {
        throw new NotFoundException(`Customer #${CustomerId} not found`);
      } else {
        return {
          success: true,
          message: 'The data of perfect Customer',
          data: existingCustomer,
        };
      }
    } catch (err) {
      throw new HttpException(
        { success: false, message: err },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getEmployeeByEmail(email: string): Promise<object> {
    console.log(email, 'emailofEmployee');
    try {
      const existingCustomer = await this.CustomerModel.findOne({
        email: email,
      });
      if (!existingCustomer) {
        throw new NotFoundException(`Employee #${email} not found`);
      } else {
        return {
          success: true,
          message: 'The data of perfect Employees',
          data: existingCustomer,
        };
      }
    } catch (err) {
      throw new HttpException(
        { success: false, message: err },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async deleteEmployee(email: string): Promise<object> {
    console.log(email, 'emailofCustomer');
    try {
      const deletedCustomer = await this.CustomerModel.findOneAndDelete({
        email,
      });
      console.log(deletedCustomer, 'deletedCustomer');
      if (!deletedCustomer) {
        throw new NotFoundException(`Customer #${email} not found`);
      } else {
        return {
          success: true,
          message: 'user deleted successfully',
          data: deletedCustomer,
        };
      }
    } catch (err) {
      throw new HttpException(
        { success: false, message: err },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // async updateStudent(studentId: string, UpdateEmployeeDto: UpdateEmployeeDto): Promise<IEmployee> {
  //     const existingStudent = await this.EmployeeModel.findByIdAndUpdate(studentId, UpdateEmployeeDto, { new: true });
  //     if (!existingStudent) {
  //         throw new NotFoundException(`Student #${studentId} not found`);
  //     }
  //     return existingStudent;
  // }

  // async getAllStudents(): Promise<IEmployee[]> {
  //     const studentData = await this.EmployeeModel.find();
  //     if (!studentData || studentData.length == 0) {
  //         throw new NotFoundException('Students data not found!');
  //     }
  //     return studentData;
  // }

  // async getStudent(studentId: string): Promise<IEmployee> {
  //     const existingStudent = await this.EmployeeModel.findById(studentId).exec();
  //     if (!existingStudent) {
  //         throw new NotFoundException(`Student #${studentId} not found`);
  //     }
  //     return existingStudent;
  // }

  // async deleteStudent(studentId: string): Promise<IEmployee> {
  //     const deletedStudent = await this.EmployeeModel.findByIdAndDelete(studentId);
  //     if (!deletedStudent) {
  //         throw new NotFoundException(`Student #${studentId} not found`);
  //     }
  //     return deletedStudent;
  // }
}
