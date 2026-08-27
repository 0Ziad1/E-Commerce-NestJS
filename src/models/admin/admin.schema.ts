import { Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ discriminatorKey: 'roles', timestamps: true, toJSON: { virtuals: true } })
export class Admin {
    email!: string;
    userName!: string;
    password!: string;
}
export const adminSchema = SchemaFactory.createForClass(Admin);