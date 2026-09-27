import { Types } from "mongoose";
import { DiscountType } from "../../../models";

export class Product {
    readonly _id!: Types.ObjectId;
    name!: string;
    slug!: string;
    description!: string;
    categoryId!: Types.ObjectId;
    brandId!: Types.ObjectId;
    createdBy!: Types.ObjectId;
    updatedBy!: Types.ObjectId;
    price!: number
    discountAmount!: number
    discountType!: DiscountType
    finalPrice!: number  //virtual 
    stock!: number
    sold!: number
    colors!: string[]
    sizes!: string[]
}
