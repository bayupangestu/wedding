import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/migrations/user.entity';
import { AuthHelper } from '@/api/auth/auth.helper';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@/migrations/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), AuthModule],
  controllers: [UserController],
  providers: [UserService, AuthHelper, JwtService]
})
export class UserModule {}
