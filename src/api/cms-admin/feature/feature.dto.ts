import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateFeatureDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateFeatureDto {
  @IsOptional()
  @IsString()
  name: string;
}
