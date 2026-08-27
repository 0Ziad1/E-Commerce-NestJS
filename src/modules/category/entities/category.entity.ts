import { Types } from "mongoose";

export class Category {
    readonly _id!: Types.ObjectId;
    slug!: string;
    name!: string;
    createdBy!: Types.ObjectId;
    updatedBy!: Types.ObjectId;
    //to do
    logo!: Object;
}
