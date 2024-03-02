import { ListMenuCms } from '@/migrations/list_menu_cms.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateListMenuDto, UpdateListMenuDto } from './list_menu.dto';
import { RoleMenu } from '@/migrations/role_menu.entity';

@Injectable()
export class ListMenuService {
  @InjectRepository(ListMenuCms)
  private listMenuRepository: Repository<ListMenuCms>;

  @InjectRepository(RoleMenu)
  private roleMenuRepository: Repository<RoleMenu>;

  public async findAll(query: any, req: any): Promise<any> {
    if (query.type === 'form') {
      const data = await this.roleMenuRepository.find({
        relations: {
          list_menu_cms: true,
          role: true
        },
        where: {
          role: {
            id: req.user.role.id
          }
        }
      });
      const result = data.map((el) => {
        return el.list_menu_cms;
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
    const queryRunner =
      this.listMenuRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await queryRunner.manager.save(ListMenuCms, data);

      if (data.role) {
        data.role.forEach(async (el) => {
          const roleMenu = new RoleMenu();
          roleMenu.list_menu_cms = result.id;
          roleMenu.role = el;
          await queryRunner.manager.save(RoleMenu, roleMenu);
        });
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        statusCode: 201,
        message: 'List Menu created successfully'
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return error;
    }
  }

  public async update(id: number, data: UpdateListMenuDto): Promise<any> {
    const dataList = await this.listMenuRepository.findOne({
      where: {
        id
      }
    });
    if (!dataList) {
      throw new HttpException('List Menu Not found', 404);
    }
    if (data.role) {
      await this.roleMenuRepository.softDelete({
        list_menu_cms: id
      });
      data.role.forEach(async (el) => {
        const roleMenu = new RoleMenu();
        roleMenu.list_menu_cms = id;
        roleMenu.role = el;
        await this.roleMenuRepository.save(roleMenu);
      });
    }
    if (data.name) {
      dataList.name = data.name;
      await this.listMenuRepository.save(dataList);
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
