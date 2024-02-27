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
import { BankService } from './bank.service';
import { JwtAuthGuard } from '@/api/auth/auth.guard';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBankDto, UpdateBankDto } from './bank.dto';

@Controller('cms-admin/bank')
export class BankController {
  @Inject(BankService)
  private readonly bankService: BankService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(@Query() query: any): Promise<any> {
    return this.bankService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param('id') id: number): Promise<any> {
    return this.bankService.findOne(id);
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
  public async create(
    @Body() data: CreateBankDto,
    @UploadedFile() file: any
  ): Promise<any> {
    return this.bankService.create(data, file);
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
  public async update(
    @Param('id') id: number,
    @Body() data: UpdateBankDto,
    @UploadedFile() file: any
  ): Promise<any> {
    return this.bankService.update(id, data, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id') id: number): Promise<any> {
    return this.bankService.delete(id);
  }
}
