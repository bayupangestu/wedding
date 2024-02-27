import { Module } from '@nestjs/common';
import { ListMenuController } from './list_menu.controller';
import { ListMenuService } from './list_menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListMenuCms } from '@/migrations/list_menu_cms.entity';
import { AuthModule } from '@/api/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListMenuCms]), AuthModule],
  controllers: [ListMenuController],
  providers: [ListMenuService]
})
export class ListMenuModule {}
