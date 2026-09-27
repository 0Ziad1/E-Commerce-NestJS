import { Types } from "mongoose";
import { DiscountType } from "../../../models";
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    name!: string;

    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    description!: string;

    @IsMongoId()
    @IsNotEmpty()
    categoryId!: Types.ObjectId;

    @IsMongoId()
    @IsNotEmpty()
    brandId!: Types.ObjectId;

    @IsNumber()
    @IsNotEmpty()
    price!: number

    @IsNumber()
    @IsOptional()
    discountAmount!: number

    @IsString()
    @IsOptional()
    @IsEnum(DiscountType)
    discountType!: DiscountType

    @IsNumber()
    @IsOptional()
    stock!: number

    @IsArray()
    @IsString({ each: true })
    colors!: string[]

    @IsArray()
    @IsString({ each: true })
    sizes!: string[]
}
