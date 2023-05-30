import { Document } from 'mongoose';
export interface ICustomer extends Document{
    readonly name: string;
    readonly email: string;
     password: string;
    readonly address: string;
}
