import {
  Model,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export class AbstractRepository<T> {
  constructor(protected model: Model<T>) { }

  async create(item: Partial<T>) {
    return await this.model.create(item);
  }

  async getOne(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return await this.model.findOne(filter, projection, options);
  }

  async exist(
    filter: QueryFilter<T>,
  ): Promise<boolean> {
    const document = await this.model.exists(filter);

    return document !== null;
  }
  async update(
    filter: QueryFilter<T>,
    updateQuery?: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ) {
    return await this.model.findOneAndUpdate(filter, updateQuery,
      {
        ...options,
        new: true,
        runValidators: true
      });
  }
}