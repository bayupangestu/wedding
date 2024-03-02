import { Feature } from '@/migrations/feature.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFeatureDto } from './feature.dto';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class FeatureService {
  @InjectRepository(Feature)
  private readonly featureRepository: Repository<Feature>;

  public async create(data: CreateFeatureDto): Promise<any> {
    await this.featureRepository.save(data);
    return {
      statusCode: 201,
      message: 'Feature created successfully'
    };
  }

  public async findAll(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.featureRepository.find();
      return {
        statusCode: 200,
        result
      };
    } else {
      query.page = query.page || 1;
      query.pageSize = query.pageSize || 10;

      const skip = (query.page - 1) * query.pageSize;
      const option: any = {
        skip: skip,
        take: query.pageSize,
        order: {
          created_at: 'DESC'
        },
        where: {}
      };
      if (query.search) {
        option.where = {
          name: ILike(`%${query.search}%`)
        };
      }
      const [result, total] = await this.featureRepository.findAndCount(option);
      return {
        statusCode: 200,
        total,
        page: query.page,
        pageSize: query.pageSize,
        result
      };
    }
  }

  public async findOne(id: number): Promise<any> {
    const result = await this.featureRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Feature Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  public async update(id: number, data: CreateFeatureDto): Promise<any> {
    const feature = await this.featureRepository.findOne({
      where: {
        id
      }
    });
    if (!feature) {
      throw new HttpException('Feature not found', 404);
    }
    await this.featureRepository.update(id, data);
    return {
      statusCode: 200,
      message: 'Feature updated successfully'
    };
  }

  public async delete(id: number): Promise<any> {
    const feature = await this.featureRepository.findOne({
      where: {
        id
      }
    });
    if (!feature) {
      throw new HttpException('Feature not found', 404);
    }
    await this.featureRepository.delete(id);
    return {
      statusCode: 200,
      message: 'Feature deleted successfully'
    };
  }
}
