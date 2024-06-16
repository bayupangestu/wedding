import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from '@/migrations/user.entity';
import { AuthHelper } from '@/api/auth/auth.helper';
import { Role } from '@/migrations/role.entity';
import { BrideInfo } from '@/migrations/bride_info.entity';
import { GroomInfo } from '@/migrations/groom_info.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async getUsers(query: any): Promise<any> {
    if (query.type === 'form') {
      const result = await this.userRepository.find({
        relations: {
          role: true
        },
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
        relations: {
          bride_info: true,
          role: true,
          groom_info: true
        },
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
      const [data, total] = await this.userRepository.findAndCount(option);

      const result = await data.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          email: item.email,
          phone_number: item.phone_number,
          role: item.role.name,
          groom_name: item.groom_info ? item.groom_info.full_name : null,
          bride_name: item.bride_info ? item.bride_info.full_name : null
        };
      });

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

  public async create(body: any): Promise<any> {
    const userData: User = await this.userRepository.findOne({
      where: { email: body.email.toLowerCase() }
    });

    if (userData) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }
    const role = await this.roleRepository.findOne({
      where: { name: body.role }
    });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    const user = new User();
    user.name = body.name;
    user.email = body.email.toLowerCase();
    user.password = this.helper.encodePassword(body.password);
    user.slug = `${body.bride}-${body.groom}`;
    user.phone_number = await this.helper.phoneNumberFormat(body.phone_number);
    user.role = role;

    await this.userRepository.save(user);
    return {
      statusCode: 201,
      message: 'User created successfully'
    };
  }

  public async update(id: number, body: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (body.role) {
      const role = await this.roleRepository.findOne({
        where: { name: body.role }
      });
      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }
      user.role = role;
    }
    user.name = body.name ? body.name : user.name;
    user.email = body.email ? body.email.toLowerCase() : user.email;
    user.phone_number = body.phone_number
      ? await this.helper.phoneNumberFormat(body.phone_number)
      : user.phone_number;
    user.slug = `${body.bride}-${body.groom}`
      ? `${body.bride}-${body.groom}`
      : user.slug;
    await this.userRepository.update(id, user);
    return {
      statusCode: 200,
      message: 'User updated successfully'
    };
  }

  public async findOne(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        role: true
      }
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      result: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role.name
      }
    };
  }

  public async delete(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.softDelete(id);
    return {
      statusCode: 200,
      message: 'User deleted successfully'
    };
  }
}
