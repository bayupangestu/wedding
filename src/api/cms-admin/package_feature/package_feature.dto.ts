import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray
} from 'class-validator';

export class CreatePackageFeatureDto {
  @IsNotEmpty()
  @IsNumber()
  package_id: number;

  @IsNotEmpty()
  @IsArray()
  feature: number[];
}

export class UpdatePackageFeatureDto {
  @IsOptional()
  @IsNumber()
  package_id: number;

  @IsOptional()
  @IsArray()
  feature: number[];
}
