import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from '../../models';
import { CategoryService } from '../category/category.service';
import { BrandService } from '../brand/brand.service';
import { Types } from 'mongoose';
import { MESSAGE } from '../../common';
import { Public } from '../../common/decorators';

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
  @Public()
  async findOne(id: string | Types.ObjectId) {
    const productExist = await this.productRepository.getOne({ _id: id });
    if (!productExist) throw new NotFoundException(MESSAGE.Product.notFound);
    return productExist;
  }

  async update(id: string | Types.ObjectId, product: Product) {
    const productExistance = await this.findOne(id);
    if (product.stock !== undefined) {
      product.stock += productExistance.stock;
    }
    const colors = this.convertToSet(productExistance.colors, product.colors)
    product.colors = Array.from(colors);

    const sizes = this.convertToSet(productExistance.sizes, product.sizes)
    product.sizes = Array.from(sizes);
    return await this.productRepository.update({ _id: id }, product, { new: true })
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  convertToSet(oldData: string[], newData: string[]) {
    const items = new Set<string>(oldData);
    for (const item of newData) {
      items.add(item);
    }
    return items;
  }
}
