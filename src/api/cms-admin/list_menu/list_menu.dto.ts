import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray
} from 'class-validator';

export class CreateListMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  role: number[];
}

export class UpdateListMenuDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  role: number[];
}
