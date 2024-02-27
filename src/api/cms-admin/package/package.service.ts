import { Package } from '@/migrations/package.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreatePackageDto, UpdatePackageDto } from './package.dto';

@Injectable()
export class PackageService {
  @InjectRepository(Package)
  private readonly packageRepository: Repository<Package>;

  public async findAll(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.packageRepository.find();
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
      const [result, total] = await this.packageRepository.findAndCount(option);
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
    const result = await this.packageRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Package Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  public async create(body: CreatePackageDto): Promise<any> {
    await this.packageRepository.save(body);
    return {
      statusCode: 201,
      message: 'Package created successfully'
    };
  }

  public async update(id: number, body: UpdatePackageDto): Promise<any> {
    const result = await this.packageRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Package Not found', 404);
    }
    await this.packageRepository.update(id, body);
    return {
      statusCode: 200,
      message: 'Package updated successfully'
    };
  }

  public async delete(id: number): Promise<any> {
    const result = await this.packageRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Package Not found', 404);
    }
    await this.packageRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Package deleted successfully'
    };
  }
}
