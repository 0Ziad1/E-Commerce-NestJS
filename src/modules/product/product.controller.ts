import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFactoryService } from './factory/product.factory';
import { Auth, User } from '../../common/decorators';
import { CategoryService } from '../category/category.service';
import { BrandService } from '../brand/brand.service';
import { MESSAGE } from '../../common';

@Controller('product')
@Auth(["Admin", "Seller"])
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productFactoryService: ProductFactoryService,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService
  ) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @User() user: any) {
    const product = this.productFactoryService.createProduct(createProductDto, user);
    await this.categoryService.findOne(product.categoryId);
    await this.brandService.findOne(product.brandId)
    const createdProduct = await this.productService.create(product);
    return {
      success: true,
      data: createdProduct,
      message: MESSAGE.Product.created
    };
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
