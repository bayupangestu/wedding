import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtAuthGuard } from '@/api/auth/auth.guard';
import { diskStorage } from 'multer';
import {
  FileFieldsInterceptor,
  FileInterceptor
} from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('cms-admin/content')
export class ClientController {
  @Inject(ClientService)
  private clientService: ClientService;

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'bride',
          maxCount: 2
        },
        {
          name: 'groom',
          maxCount: 2
        },
        {
          name: 'homepage',
          maxCount: 1
        },
        {
          name: 'bride_groom',
          maxCount: 2
        },
        {
          name: 'quotes',
          maxCount: 2
        },
        {
          name: 'gallery',
          maxCount: 20
        },
        {
          name: 'music',
          maxCount: 1
        },
        {
          name: 'video',
          maxCount: 1
        }
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const filename = `${Date.now()}${extname(file.originalname)}`;
            cb(null, filename);
          }
        })
      }
    )
  )
  private async create(
    @Body() data: any,
    @UploadedFiles()
    files: {
      bride: any;
      groom: any;
      homepage: any;
      bride_groom: any;
      quotes: any;
      gallery: any;
      music: any;
      video: any;
    }
  ): Promise<any> {
    return this.clientService.create(data, files);
  }
}
