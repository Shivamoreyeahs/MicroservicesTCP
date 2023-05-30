import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Product {
   @Prop()
   product_name: string;
   @Prop({
      required: true
    })
    product_price: string;
   @Prop()
   product_type: string;
   @Prop()
   product_ranking: string;
  
}
export const ProductSchema = SchemaFactory.createForClass(Product);