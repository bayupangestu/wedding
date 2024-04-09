import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CustomPageOrderService } from './custom-page-order.service';
import { JwtAuthGuard } from '@/api/auth/auth.guard';

@Controller('cms-admin/custom-page-order')
export class CustomPageOrderController {
  @Inject(CustomPageOrderService)
  private readonly customPageOrderService: CustomPageOrderService;

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async create(@Body() body: any): Promise<any> {
    return this.customPageOrderService.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async findAll(): Promise<any> {
    return this.customPageOrderService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async findOne(@Param('id') id: number): Promise<any> {
    return this.customPageOrderService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async update(
    @Param('id') id: number,
    @Body() body: any
  ): Promise<any> {
    return this.customPageOrderService.update(id, body);
  }
}
