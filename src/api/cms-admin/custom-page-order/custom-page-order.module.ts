import { Module } from '@nestjs/common';
import { CustomPageOrderController } from './custom-page-order.controller';
import { CustomPageOrderService } from './custom-page-order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomPageOrder } from '@/migrations/custom_page_order.entity';
import { AuthModule } from '@/api/auth/auth.module';
import { Template } from '@/migrations/template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomPageOrder, Template]), AuthModule],
  controllers: [CustomPageOrderController],
  providers: [CustomPageOrderService]
})
export class CustomPageOrderModule {}
