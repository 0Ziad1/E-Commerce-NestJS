import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth, Public, Roles, User } from '../../common/decorators';
import { CategoryFactoryService } from './factory';


@Controller('category')
@Auth(['Admin'])
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactoryService: CategoryFactoryService
  ) { }

  @Post()

  async create(@Body() createCategoryDto: CreateCategoryDto, @User() user: any) {
    const category = this.categoryFactoryService.createCategory(createCategoryDto, user)

    const createdCategory = await this.categoryService.create(category);

    return {
      message: "Category created successfully",
      succuess: true,
      data: createdCategory
    }
  }



  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @User() user: any) {
    const category = await this.categoryFactoryService.updateCategory(id, updateCategoryDto, user);
    const newCategory = await this.categoryService.update(id, category);
    return {
      message: "Category updated successfully",
      success: "true",
      data: newCategory,
    }
  }
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return {
      success: true,
      data: category,
    }
  }
  @Public()
  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      success: true,
      data: categories,
    }
  }

}
