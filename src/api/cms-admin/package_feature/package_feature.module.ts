import { Module } from '@nestjs/common';
import { PackageFeatureController } from './package_feature.controller';
import { PackageFeatureService } from './package_feature.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageFeature } from '@/migrations/package_feature.entity';
import { AuthModule } from '@/api/auth/auth.module';
import { Package } from '@/migrations/package.entity';
import { Feature } from '@/migrations/feature.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PackageFeature, Package, Feature]),
    AuthModule
  ],
  controllers: [PackageFeatureController],
  providers: [PackageFeatureService]
})
export class PackageFeatureModule {}
