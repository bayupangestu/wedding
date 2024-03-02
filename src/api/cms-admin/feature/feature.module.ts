import { Module } from '@nestjs/common';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from '@/migrations/feature.entity';
import { AuthModule } from '@/api/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Feature]), AuthModule],
  controllers: [FeatureController],
  providers: [FeatureService]
})
export class FeatureModule {}
