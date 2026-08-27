import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from '../../models';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) { }
  async create(category: Category) {
    const categoryExistance = await this.categoryRepository.getOne({ slug: category.slug });
    if (categoryExistance) throw new ConflictException("Category already exist");


    return await this.categoryRepository.create(category);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const categories = await this.categoryRepository.find(
      {},
      {},
      {
        limit,
        skip,
      },
    );

    return categories;
  }

  async findOne(id: string) {
    const categoryData = await this.categoryRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: 'createdBy' }
          , { path: 'updatedBy' }]
      });
    if (!categoryData) throw new NotFoundException('Category not found');
    return categoryData;
  }

  async update(id: string, category: Category) {
    const categoryExistance = await this.categoryRepository.getOne({ slug: category.slug, _id: { $ne: id } });
    if (categoryExistance) throw new ConflictException("Category already exist");
    return await this.categoryRepository.update({ _id: id }, category)
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
