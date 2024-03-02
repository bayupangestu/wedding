import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/migrations/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decode JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoced: any): Promise<any> {
    const result = await this.repository.findOne({
      relations: {
        role: true
      },
      where: { id: decoced.id }
    });
    if (result.role.name === 'admin' || result.role.name === 'superadmin') {
      return result;
    }
  }

  // Generate JWT Token
  public generateToken(user: any): string {
    console.log(user, '<<<<<<<<<');

    return this.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role.name
    });
  }

  // Validate User's Password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's Password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, Throw forbidden error if JWT token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoced: unknown = this.jwt.verify(token);
    if (!decoced) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const user: User = await this.validateUser(decoced);
    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }

  public async phoneNumberFormat(phoneNumber: string) {
    if (phoneNumber[0] !== '+') {
      if (phoneNumber[0] === '0') {
        const countryCode = phoneNumber.split('');
        countryCode[0] = '+62';
        phoneNumber = countryCode.join('');
      }
      if (phoneNumber.slice(0, 2) === '62') {
        const countryCode = phoneNumber.split('');
        countryCode.unshift('+');
        phoneNumber = countryCode.join('');
      }
      if (phoneNumber.slice(0, 3) !== '+62') {
        const countryCode = phoneNumber.split('');
        countryCode.unshift('+62');
        phoneNumber = countryCode.join('');
      }
    }
    return phoneNumber;
  }
}
