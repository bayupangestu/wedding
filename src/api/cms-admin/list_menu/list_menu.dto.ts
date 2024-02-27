import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean
} from 'class-validator';

export class CreateListMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateListMenuDto {
  @IsOptional()
  @IsString()
  name: string;
}
