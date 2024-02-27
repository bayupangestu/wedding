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
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { PackageService } from './package.service';
import { JwtAuthGuard } from '@/api/auth/auth.guard';
import { CreatePackageDto } from './package.dto';

@Controller('cms-admin/package')
export class PackageController {
  @Inject(PackageService)
  private readonly packageService: PackageService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(@Query() query: any): Promise<any> {
    return this.packageService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param('id') id: number): Promise<any> {
    return this.packageService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() data: CreatePackageDto): Promise<any> {
    return this.packageService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async update(
    @Param('id') id: number,
    @Body() data: CreatePackageDto
  ): Promise<any> {
    return this.packageService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async delete(@Param('id') id: number): Promise<any> {
    return this.packageService.delete(id);
  }
}
