import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
export enum DiscountType {
    fixed_amount = "fixed_amount",
    percentage = "percentage"
}
@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
})
export class Product {
    readonly _id!: Types.ObjectId;
    @Prop({ type: String, required: true, trim: true })
    name!: string;
    @Prop({ type: String, required: true, trim: true })
    slug!: string;
    @Prop({ type: String, required: true, trim: true })
    description!: string;
    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: "Category" })
    categoryId!: Types.ObjectId;
    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: "Brand" })
    brandId!: Types.ObjectId;
    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: "User" })
    createdBy!: Types.ObjectId;
    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: "User" })
    updatedBy!: Types.ObjectId;
    @Prop({ type: Number, min: 1, required: true })
    price!: number
    @Prop({ type: Number, min: 1, default: 0 })
    discountAmount!: number
    @Prop({ type: String, enum: DiscountType, default: DiscountType.fixed_amount })
    discountType!: DiscountType
    @Virtual({
        get: function (this: Product) {
            if (this.discountType == DiscountType.fixed_amount)
                return this.price - this.discountAmount;
            return this.price - (this.price * (this.discountAmount / 100))
        }
    })
    finalPrice!: Number  //virtual 
    @Prop({ type: Number, min: 0, default: 1 })
    stock!: Number
    @Prop({ type: Number, min: 0 })
    sold!: Number
    @Prop({ type: [String] })
    colors!: string[]
    @Prop({ type: [String] })
    size!: string[]
}
export const productSchema = SchemaFactory.createForClass(Product)