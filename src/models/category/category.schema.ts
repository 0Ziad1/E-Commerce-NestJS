import { Prop } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

export class Category {
    readonly _id!: Types.ObjectId;
    @Prop({ type: String, unique: true, required: true, trim: true })
    slug!: string;
    @Prop({ type: String, unique: true, required: true, trim: true })
    name!: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: "Admin", required: true })
    createdBy!: Types.ObjectId;

    //to do
    logo!: object;

}