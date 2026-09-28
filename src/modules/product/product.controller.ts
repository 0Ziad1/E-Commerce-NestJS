import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFactoryService } from './factory/product.factory';
import { Auth, User } from '../../common/decorators';
import { CategoryService } from '../category/category.service';
import { BrandService } from '../brand/brand.service';
import { MESSAGE } from '../../common';
import { Product } from './entities/product.entity';
import { Types } from 'mongoose';

@Controller('product')
@Auth(["Admin", "Seller"])
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productFactoryService: ProductFactoryService,
  ) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @User() user: any) {
    const product = this.productFactoryService.createProduct(createProductDto, user);
    const createdProduct = await this.productService.create(product, user);
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
    return this.productService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string | Types.ObjectId, @Body() product: Product) {
    return await this.productService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
