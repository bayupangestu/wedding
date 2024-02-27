import { ListMenuCms } from '@/migrations/list_menu_cms.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateListMenuDto, UpdateListMenuDto } from './list_menu.dto';

@Injectable()
export class ListMenuService {
  @InjectRepository(ListMenuCms)
  private listMenuRepository: Repository<ListMenuCms>;

  public async findAll(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.listMenuRepository.find();
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
      const [result, total] = await this.listMenuRepository.findAndCount(
        option
      );
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
    const result = await this.listMenuRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('List Menu Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  public async create(data: CreateListMenuDto): Promise<any> {
    const result = await this.listMenuRepository.save(data);
    return {
      statusCode: 201,
      message: 'List Menu created successfully'
    };
  }

  public async update(id: number, data: UpdateListMenuDto): Promise<any> {
    const result = await this.listMenuRepository.update(id, data);
    if (result.affected === 0) {
      throw new HttpException('List Menu Not found', 404);
    }
    return {
      statusCode: 200,
      message: 'List Menu updated successfully'
    };
  }

  public async delete(id: number): Promise<any> {
    const result = await this.listMenuRepository.softDelete(id);
    if (result.affected === 0) {
      throw new HttpException('List Menu Not found', 404);
    }
    return {
      statusCode: 200,
      message: 'List Menu deleted successfully'
    };
  }
}
