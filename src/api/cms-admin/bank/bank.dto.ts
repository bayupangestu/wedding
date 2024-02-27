import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean
} from 'class-validator';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export class CreateBankDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  file: string;
}

export class UpdateBankDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  file: string;
}
