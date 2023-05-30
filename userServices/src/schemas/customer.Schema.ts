import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Customer {
   @Prop()
   name: string;
   @Prop({
      required: true
    })
    email: string;
   @Prop()
   password: string;
   @Prop()
   address: string;
  
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);