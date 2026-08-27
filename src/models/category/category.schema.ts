import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mongoose, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Category {
    readonly _id!: Types.ObjectId;
    @Prop({ type: String, unique: true, required: true, trim: true })
    slug!: string;
    @Prop({ type: String, unique: true, required: true, trim: true })
    name!: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: "Admin", required: true })
    createdBy!: Types.ObjectId;
    @Prop({ type: SchemaTypes.ObjectId, ref: "Admin", required: true })
    updatedBy!: Types.ObjectId;
    //to do
    logo!: object;

}
export const categorySchema = SchemaFactory.createForClass(Category)