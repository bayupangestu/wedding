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
import { PackageFeatureService } from './package_feature.service';
import { JwtAuthGuard } from '@/api/auth/auth.guard';

@Controller('cms-admin/package-feature')
export class PackageFeatureController {
  @Inject(PackageFeatureService)
  private readonly packageFeatureService: PackageFeatureService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll() {
    return this.packageFeatureService.findAll();
  }

  @Get('package')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Query() query: any) {
    return this.packageFeatureService.findOne(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() data: any) {
    return this.packageFeatureService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async update(@Param('id') id: number, @Body() data: any) {
    return this.packageFeatureService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async delete(@Param('id') id: number) {
    return this.packageFeatureService.delete(id);
  }
}
