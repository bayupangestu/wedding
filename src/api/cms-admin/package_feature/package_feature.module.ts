import { Module } from '@nestjs/common';
import { PackageFeatureController } from './package_feature.controller';
import { PackageFeatureService } from './package_feature.service';

@Module({
  controllers: [PackageFeatureController],
  providers: [PackageFeatureService]
})
export class PackageFeatureModule {}
