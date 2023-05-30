import {
    Controller,
    Post,
    Put,
    Get,
    Body,
    Req,
    Inject,
    HttpStatus,
    HttpException,
    Param,
  } from '@nestjs/common';
  import { firstValueFrom } from 'rxjs';
  import { ClientProxy } from '@nestjs/microservices';
 
  
//   import { Authorization } from './decorators/authorization.decorator';
//   import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
//   import { IServiceUserCreateResponse } from './interfaces/user/service-user-create-response.interface';
//   import { IServiceUserSearchResponse } from './interfaces/user/service-user-search-response.interface';
//   import { IServiveTokenCreateResponse } from './interfaces/token/service-token-create-response.interface';
//   import { IServiceTokenDestroyResponse } from './interfaces/token/service-token-destroy-response.interface';
//   import { IServiceUserConfirmResponse } from './interfaces/user/service-user-confirm-response.interface';
//   import { IServiceUserGetByIdResponse } from './interfaces/user/service-user-get-by-id-response.interface';
  
//   import { GetUserByTokenResponseDto } from './interfaces/user/dto/get-user-by-token-response.dto';
//   import { CreateUserDto } from './interfaces/user/dto/create-user.dto';
//   import { CreateUserResponseDto } from './interfaces/user/dto/create-user-response.dto';
//   import { LoginUserDto } from './interfaces/user/dto/login-user.dto';
//   import { LoginUserResponseDto } from './interfaces/user/dto/login-user-response.dto';
//   import { LogoutUserResponseDto } from './interfaces/user/dto/logout-user-response.dto';
//   import { ConfirmUserDto } from './interfaces/user/dto/confirm-user.dto';
//   import { ConfirmUserResponseDto } from './interfaces/user/dto/confirm-user-response.dto';
  
  @Controller()

  export class ApiController {
    constructor(
   
      @Inject('User_Service') private readonly userServiceClient: ClientProxy,
      @Inject('Token_Service') private readonly tokenServiceClient: ClientProxy,
      @Inject('Product_Service') private readonly productServiceClient: ClientProxy,
    ) {}
  
    @Get()
    getHello(): string {
        return 'Hello World!';
      }
  

   
    
    // public async getUserByToken(
    //   @Req() request: IAuthorizedRequest,
    // ): Promise<GetUserByTokenResponseDto> {
    //   const userInfo = request.user;
  
    //   const userResponse: IServiceUserGetByIdResponse = await firstValueFrom(
    //     this.userServiceClient.send('user_get_by_id', userInfo.id),
    //   );
  
    //   return {
    //     message: userResponse.message,
    //     data: {
    //       user: userResponse.user,
    //     },
    //     errors: null,
    //   };
    // }
  
    @Post('/create')
 
    public async createUser(
      @Body() userRequest,
    ): Promise<any>{
        console.log(userRequest, 'userRequest');
      const createUserResponse = await firstValueFrom(
        this.userServiceClient.send('user_create', userRequest),
      );
      console.log(createUserResponse, 'createUserResponse');
      if (createUserResponse.status !== HttpStatus.CREATED) {
        throw new HttpException(
          {
            message: createUserResponse.message,
            data: null,
            errors: createUserResponse.errors,
          },
          createUserResponse.status,
        );
      }
  
      const createTokenResponse = await firstValueFrom(
        this.tokenServiceClient.send('token_create', {
          userId: createUserResponse.user._id,
        }),
      );
  
      return {
        message: createUserResponse.message,
        data: {
          user: createUserResponse.user,
          token: createTokenResponse.token,
        },
        errors: null,
      };
    }
  
    // @Post('/login')
    // @ApiCreatedResponse({
    //   type: LoginUserResponseDto,
    // })
    // public async loginUser(
    //   @Body() loginRequest: LoginUserDto,
    // ): Promise<LoginUserResponseDto> {
    //   const getUserResponse: IServiceUserSearchResponse = await firstValueFrom(
    //     this.userServiceClient.send('user_search_by_credentials', loginRequest),
    //   );
  
    //   if (getUserResponse.status !== HttpStatus.OK) {
    //     throw new HttpException(
    //       {
    //         message: getUserResponse.message,
    //         data: null,
    //         errors: null,
    //       },
    //       HttpStatus.UNAUTHORIZED,
    //     );
    //   }
  
    //   const createTokenResponse: IServiveTokenCreateResponse = await firstValueFrom(
    //     this.tokenServiceClient.send('token_create', {
    //       userId: getUserResponse.user.id,
    //     }),
    //   );
  
    //   return {
    //     message: createTokenResponse.message,
    //     data: {
    //       token: createTokenResponse.token,
    //     },
    //     errors: null,
    //   };
    // }
  
    // @Put('/logout')
    // @Authorization(true)
    // @ApiCreatedResponse({
    //   type: LogoutUserResponseDto,
    // })
    // public async logoutUser(
    //   @Req() request: IAuthorizedRequest,
    // ): Promise<LogoutUserResponseDto> {
    //   const userInfo = request.user;
  
    //   const destroyTokenResponse: IServiceTokenDestroyResponse = await firstValueFrom(
    //     this.tokenServiceClient.send('token_destroy', {
    //       userId: userInfo.id,
    //     }),
    //   );
  
    //   if (destroyTokenResponse.status !== HttpStatus.OK) {
    //     throw new HttpException(
    //       {
    //         message: destroyTokenResponse.message,
    //         data: null,
    //         errors: destroyTokenResponse.errors,
    //       },
    //       destroyTokenResponse.status,
    //     );
    //   }
  
    //   return {
    //     message: destroyTokenResponse.message,
    //     errors: null,
    //     data: null,
    //   };
    // }
  
    // @Get('/confirm/:link')
    // @ApiCreatedResponse({
    //   type: ConfirmUserResponseDto,
    // })
    // public async confirmUser(
    //   @Param() params: ConfirmUserDto,
    // ): Promise<ConfirmUserResponseDto> {
    //   const confirmUserResponse: IServiceUserConfirmResponse = await firstValueFrom(
    //     this.userServiceClient.send('user_confirm', {
    //       link: params.link,
    //     }),
    //   );
  
    //   if (confirmUserResponse.status !== HttpStatus.OK) {
    //     throw new HttpException(
    //       {
    //         message: confirmUserResponse.message,
    //         data: null,
    //         errors: confirmUserResponse.errors,
    //       },
    //       confirmUserResponse.status,
    //     );
    //   }
  
    //   return {
    //     message: confirmUserResponse.message,
    //     errors: null,
    //     data: null,
    //   };
    // }
  }