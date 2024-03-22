import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { PaginateDto } from '../common/dto/pagination/paginate-sort-dto';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(entityFilterQuery: FilterQuery<T>): Promise<T | null> {
    return await this.entityModel.findOne(entityFilterQuery).exec();
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return await this.entityModel.find(entityFilterQuery).exec();
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return await entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T> {
    return await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
    );
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.deleteMany(entityFilterQuery);
    return result.deletedCount >= 1;
  }

  async findAllPaginated(basePaginateDto: PaginateDto): Promise<any> {
    const { pageNumber, pageSize } = basePaginateDto;

    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const data = await this.entityModel.find().skip(skip).limit(take).exec();

    const count = await this.entityModel.countDocuments({}).exec();

    const totalPages = Math.ceil(count / pageSize);

    return {
      data,
      count,
      pageNumber,
      pageSize,
      totalPages,
    };
  }
}
