import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true, })
export class Brand {
    readonly _id!: Types.ObjectId;
    @Prop({ type: String, unique: true, trim: true, required: true })
    name!: string;
    @Prop({ type: String, unique: true, trim: true, required: true })
    slug!: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: "Admin", required: true })
    createdBy!: Types.ObjectId;
    @Prop({ type: SchemaTypes.ObjectId, ref: "Admin", required: true })
    updatedBy!: Types.ObjectId;
    logo!: Object;  //interceptor
}
export const brandSchema = SchemaFactory.createForClass(Brand);