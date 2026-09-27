import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from '../../models';
import { CategoryService } from '../category/category.service';
import { BrandService } from '../brand/brand.service';
import { Types } from 'mongoose';
import { MESSAGE } from '../../common';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService
  ) { }
  async create(product: Product, user: any) {
    await this.categoryService.findOne(product.categoryId);
    await this.brandService.findOne(product.brandId);
    const productExistance = await this.productRepository
      .getOne(
        {
          slug: product.slug
          , $or: [{ createdBy: user._id }, { updatedBy: user._id }]
        }
      )
    if (productExistance) {
      return await this.update(productExistance._id, product);
    }
    return await this.productRepository.create(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: string | Types.ObjectId, product: Product) {
    const productExistance = await this.productRepository.getOne({ _id: id });
    if (!productExistance) throw new NotFoundException(MESSAGE.Product.notFound);
    if (product.stock !== undefined) {
      product.stock += productExistance.stock;
    }
    const colors = new Set<string>(productExistance.colors);
    for (const color of product.colors) {
      colors.add(color);
    }
    product.colors = Array.from(colors);

    const sizes = new Set<string>(productExistance.sizes);
    for (const size of product.sizes) {
      sizes.add(size);
    }
    product.sizes = Array.from(sizes);
    return await this.productRepository.update({ _id: id }, product, { new: true })
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
