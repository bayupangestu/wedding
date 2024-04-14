import { AuthHelper } from '@/api/auth/auth.helper';
import { AuthService } from '@/api/auth/auth.service';
import { Role } from '@/migrations/role.entity';
import { User } from '@/migrations/user.entity';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @Inject(AuthHelper)
  private authHelper: AuthHelper;

  public async create(data: any): Promise<any> {
    const user = await this.userRepository.findOne({
      relations: {
        role: true
      },
      where: [
        {
          email: data.email
        },
        {
          phone_number: data.phone_number
        },
        {
          slug: data.slug
        },
        {
          role: {
            name: 'user'
          }
        }
      ]
    });
    if (user) {
      throw new HttpException('User already exists', 400);
    }
    const role = await this.roleRepository.findOne({
      where: {
        name: 'user'
      }
    });
    if (!role) {
      throw new HttpException('Role not found', 400);
    }
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // register user
      const user = new User();
      user.email = data.email;
      user.password = await this.authHelper.encodePassword(
        `${data.name}-12345`
      );
      user.name = data.name;
      user.role = role;
      user.phone_number = await this.authHelper.phoneNumberFormat(
        data.phone_number
      );
      user.slug = data.slug;
      await queryRunner.manager.save(User, user);

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return error;
    }
  }
}
