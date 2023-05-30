import { IsNotEmpty,  IsString, MaxLength } from "class-validator";
export class CreateProductDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly product_name: string;
    @IsString()
    @IsNotEmpty()
    readonly product_price: string;
    
    @IsString()
    @IsNotEmpty()
   product_type: string;
   
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly product_ranking: string;
  
}