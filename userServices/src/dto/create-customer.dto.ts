import { IsNotEmpty,  IsString, MaxLength } from "class-validator";
export class CreateCustomerDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    
    @IsString()
    @IsNotEmpty()
   password: string;
   
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly address: string;
  
}