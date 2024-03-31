import { Role } from '@/migrations/role.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';

@Injectable()
export class RoleService {
  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  public async findAll(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.roleRepository.find({
        order: {
          created_at: 'DESC'
        }
      });
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
      const [result, total] = await this.roleRepository.findAndCount(option);
      const totalPage = Math.ceil(total / query.pageSize);
      return {
        statusCode: 200,
        total,
        totalPage,
        page: query.page,
        pageSize: query.pageSize,
        result
      };
    }
  }

  public async findOne(id: number): Promise<any> {
    const result = await this.roleRepository.findOne({
      where: {
        id
      }
    });
    if (!result) {
      throw new HttpException('Role Not found', 404);
    }
    return {
      statusCode: 200,
      result
    };
  }

  public async create(data: CreateRoleDto): Promise<any> {
    const result = await this.roleRepository.save(data);
    return {
      statusCode: 201,
      message: 'Role created successfully'
    };
  }

  public async update(id: number, data: UpdateRoleDto): Promise<any> {
    const dataRole = await this.roleRepository.findOne({
      where: { id }
    });
    if (!dataRole) {
      throw new HttpException('Role Not found', 404);
    }
    await this.roleRepository.update({ id }, data);
    return {
      statusCode: 200,
      message: 'Role updated successfully'
    };
  }

  public async delete(id: number): Promise<any> {
    const dataRole = await this.roleRepository.findOne({
      where: { id }
    });
    if (!dataRole) {
      throw new HttpException('Role Not found', 404);
    }
    await this.roleRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'Role deleted successfully'
    };
  }
}
