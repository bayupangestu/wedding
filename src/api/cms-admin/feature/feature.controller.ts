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
import { FeatureService } from './feature.service';
import { JwtAuthGuard } from '@/api/auth/auth.guard';

@Controller('cms-admin/feature')
export class FeatureController {
  @Inject(FeatureService)
  private readonly featureService: FeatureService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(@Query() query: any) {
    return this.featureService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param('id') id: number) {
    return this.featureService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() data: any) {
    return this.featureService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async update(@Param('id') id: number, @Body() data: any) {
    return this.featureService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async delete(@Param('id') id: number) {
    return this.featureService.delete(id);
  }
}
