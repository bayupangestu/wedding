import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/migrations/user.entity';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth.helper';
import { Role } from '@/migrations/role.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: any): Promise<any> {
    const userData: User = await this.repository.findOne({
      where: { email: body.email.toLowerCase() }
    });

    if (userData) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
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
    user.role = role;

    return this.repository.save(user);
  }

  public async login(body: any): Promise<string | never> {
    const { email, password }: any = body;
    const user: User = await this.repository.findOne({
      relations: {
        role: true
      },
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      throw new HttpException('No user found', 401);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new HttpException('No user found', 401);
    }

    this.repository.update(user.id, { lastLoginAt: new Date() });
    const result: any = {
      status_code: 200,
      token: this.helper.generateToken(user)
    };

    return result;
  }

  public async refresh(user: User): Promise<string> {
    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }
}
