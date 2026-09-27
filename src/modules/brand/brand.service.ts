import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand, BrandRepository } from '../../models';
import { MESSAGE } from '../../common';
import { Types } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) { }
  async create(brand: Brand) {
    const brandExistance = await this.brandRepository.getOne({ slug: brand.slug });
    if (brandExistance) throw new ConflictException(MESSAGE.Brand.alreadyExist);
    return await this.brandRepository.create(brand);
  }

  findAll() {
    return `This action returns all brand`;
  }

  async findOne(id: string | Types.ObjectId) {
    const brand = await this.brandRepository.getOne({ _id: id });
    if (!brand) throw new NotFoundException(MESSAGE.Brand.notFound);
    return brand;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
