import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstractRepository";
import { Brand } from "./brand.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
@Injectable()
export class BrandRepository extends AbstractRepository<Brand>{
    constructor(@InjectModel(Brand.name) private readonly brandModel:Model<Brand>){
        super(brandModel)
    }
}