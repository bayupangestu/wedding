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
import { RoleService } from './role.service';
import { JwtAuthGuard } from '@/api/auth/auth.guard';

@Controller('cms-admin/role')
export class RoleController {
  @Inject(RoleService)
  private readonly roleService: RoleService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(@Query() query: any): Promise<any> {
    return this.roleService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param('id') id: number): Promise<any> {
    return this.roleService.findOne(id);
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() data: any): Promise<any> {
    return this.roleService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async update(
    @Param('id') id: number,
    @Body() data: any
  ): Promise<any> {
    return this.roleService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async delete(@Param('id') id: number): Promise<any> {
    return this.roleService.delete(id);
  }
}
