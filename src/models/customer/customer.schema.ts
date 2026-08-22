import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ discriminatorKey: 'roles', timestamps: true, toJSON: { virtuals: true } })
export class Customer {
    email!:string;
    userName!: string;
    password!: string;
    otp!: string;
    otpExpiry!: Date;
    isVerified!: boolean;
    @Prop({ type: Date })
    dob!: Date;
}
export const customerSchema = SchemaFactory.createForClass(Customer);