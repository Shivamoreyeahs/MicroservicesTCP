import { Document } from 'mongoose';
export interface IProduct extends Document{
    readonly product_name: string;
    readonly product_price: string;
     product_type: string;
    readonly product_ranking: string;
}
