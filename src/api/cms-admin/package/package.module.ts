import { Module } from '@nestjs/common';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from '@/migrations/package.entity';
import { AuthModule } from '@/api/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Package]), AuthModule],
  controllers: [PackageController],
  providers: [PackageService]
})
export class PackageModule {}
