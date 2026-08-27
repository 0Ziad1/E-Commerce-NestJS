import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "../entities/category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";
import slugify from "slugify"
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CategoryRepository } from "../../../models";
@Injectable()
export class CategoryFactoryService {
    constructor(private readonly categoryRepository: CategoryRepository) { }
    createCategory(createCategoryDto: CreateCategoryDto, user: any) {
        const category = new Category();
        category.createdBy = user._id;
        category.updatedBy = user._id;
        category.logo = createCategoryDto.logo;
        category.name = createCategoryDto.name;
        category.slug = slugify(createCategoryDto.name, {
            replacement: "-",
            lower: true,
            trim: true
        })
        return category;
    }
    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto, user: any) {

        const oldCategory = await this.categoryRepository.getOne({ _id: id });

        if (!oldCategory) throw new NotFoundException("Category not found");
        const category = new Category();
        category.name = updateCategoryDto?.name || oldCategory.name;
        category.logo = updateCategoryDto?.logo || oldCategory.logo;
        category.updatedBy = user._id;
        category.slug = slugify(category.name, {
            replacement: "-",
            lower: true,
            trim: true
        })
        return category;
    }


}