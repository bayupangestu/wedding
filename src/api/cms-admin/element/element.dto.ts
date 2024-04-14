import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateElementDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  asset: any;

  @IsNotEmpty()
  @IsString()
  element: string;
}

export class UpdateElementDto {
  @IsOptional()
  name: string;

  @IsOptional()
  asset: any;

  @IsOptional()
  element: string;
}
