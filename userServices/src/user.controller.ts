import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { loginCustomerDto } from './dto/login-customer.dto';
import { CustomerService } from './services/user.service';
import { MessagePattern } from '@nestjs/microservices';
// import { AuthGuard } from './guards/user-auth.guards';
// import { Roles } from './guards/user-roles.decorators';
@Controller()
export class UserController {
  constructor(private readonly customerService: CustomerService) { }

  @MessagePattern('user_create')
  createEmployee(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.signUp(createCustomerDto);
  }
  
  @Post('login')
  login(@Body() data: loginCustomerDto) {
    return this.customerService.login(data);
  }
  @Put('/update/:id')
 
  updateEmployee(@Param('id') customerId: string,@Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.updateApi(customerId, updateCustomerDto);
  }
  @Get()

  getEmployees() {
    return this.customerService.getAllEmployee();
  }

  @Get('/exactemployees')
 
  async getEmployeeByemail(@Body('email') Email: string) {
    return this.customerService.getEmployeeByEmail(Email);
  }
  @Get('/:id')

  async getEmployee(@Param('id') EmployeeId: string) {
    return this.customerService.getEmployeeById(EmployeeId);
  }
  
  
  @Delete('/delete')

  async deleteEmployee(@Body('email') email: string) {
    return this.customerService.deleteEmployee(email);
  }


  // @Put('/:id')
  // async updateStudent(@Res() response,@Param('id') studentId: string,
  // @Body() updateEmployeeDto: UpdateEmployeeDto) {
  //   try {
  //    const existingStudent = await this.employeeService.updateStudent(studentId, updateEmployeeDto);
  //   return response.status(HttpStatus.OK).json({
  //   message: 'Student has been successfully updated',
  //   existingStudent,});
  //  } catch (err) {
  //    return response.status(err.status).json(err.response);
  //  }
  // }

  // @Get()
  // async getStudents(@Res() response) {
  // try {
  //   const studentData = await this.employeeService.getAllStudents();
  //   return response.status(HttpStatus.OK).json({
  //   message: 'All students data found successfully',studentData,});
  //  } catch (err) {
  //   return response.status(err.status).json(err.response);
  //  }
  // }

  // async getStudent(@Res() response, @Param('id') studentId: string) {
  //  try {
  //     const existingStudent = await
  // this.employeeService.getStudent(studentId);
  //     return response.status(HttpStatus.OK).json({
  //     message: 'Student found successfully',existingStudent,});
  //  } catch (err) {
  //    return response.status(err.status).json(err.response);
  //  }
  // }

  // @Delete('/:id')
  // async deleteStudent(@Res() response, @Param('id') studentId: string)
  // {
  //   try {
  //     const deletedStudent = await this.employeeService.deleteStudent(studentId);
  //     return response.status(HttpStatus.OK).json({
  //     message: 'Student deleted successfully',
  //     deletedStudent,});
  //   }catch (err) {
  //     return response.status(err.status).json(err.response);
  //   }
  //  }
  // @Get('/:id')



}