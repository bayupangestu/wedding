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
import { CreateListMenuDto, UpdateListMenuDto } from './list_menu.dto';
import { ListMenuService } from './list_menu.service';
import { JwtAuthGuard } from '@/api/auth/auth.guard';

@Controller('cms-admin/list-menu')
export class ListMenuController {
  @Inject(ListMenuService)
  private readonly listMenuService: ListMenuService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(@Query() query: any): Promise<any> {
    return this.listMenuService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param('id') id: number): Promise<any> {
    return this.listMenuService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(@Body() data: CreateListMenuDto): Promise<any> {
    return this.listMenuService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async update(
    @Param('id') id: number,
    @Body() data: UpdateListMenuDto
  ): Promise<any> {
    return this.listMenuService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async delete(@Param('id') id: number): Promise<any> {
    return this.listMenuService.delete(id);
  }
}
