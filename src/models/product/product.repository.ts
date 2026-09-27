import { Model } from "mongoose";
import { AbstractRepository } from "../abstractRepository";

import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./product.schema";

export class ProductRepository extends AbstractRepository<Product> {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
        super(productModel);
    }
}