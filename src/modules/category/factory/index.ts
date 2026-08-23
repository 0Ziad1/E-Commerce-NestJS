import { Injectable } from "@nestjs/common";
import { Category } from "../entities/category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import slugify from "slugify"
@Injectable()
export class CategoryFactoryService {
    createCategory(createCategoryDto: CreateCategoryDto, user: any) {
        const category = new Category();
        category.createdBy = user._id;
        category.logo = createCategoryDto.logo;
        category.name = createCategoryDto.name;
        category.slug = slugify(createCategoryDto.name, {
            replacement: "-",
            lower: true,
            trim: true
        })
        return category;
    }


}