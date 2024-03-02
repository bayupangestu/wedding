import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/api/auth/auth.module';
import { Role } from '@/migrations/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
