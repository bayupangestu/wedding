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
import { diskStorage } from 'multer';
import { ElementService } from './element.service';
import { JwtAuthGuard } from '@/api/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cms-admin/element')
export class ElementController {
  @Inject(ElementService)
  private readonly elementService: ElementService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async findAll(@Query() query: any): Promise<any> {
    return this.elementService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async findOne(
    @Param('id') id: number,
    @Query() query: any
  ): Promise<any> {
    return this.elementService.findOne(id, query.element);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${file.originalname}`);
        }
      })
    })
  )
  private async create(
    @Body() data: any,
    @UploadedFile() file: any
  ): Promise<any> {
    return this.elementService.create(data, file);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${file.originalname}`);
        }
      })
    })
  )
  private async update(
    @Param('id') id: number,
    @Body() data: any,
    @UploadedFile() file: any
  ): Promise<any> {
    return this.elementService.update(id, data, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  private async delete(
    @Param('id') id: number,
    @Query() query: any
  ): Promise<any> {
    return this.elementService.delete(id, query.element);
  }
}
