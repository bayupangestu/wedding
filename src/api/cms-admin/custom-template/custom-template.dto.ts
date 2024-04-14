import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CustomTemplateDto {
  @IsNotEmpty()
  @IsNumber()
  element_id_top: number;

  @IsNotEmpty()
  @IsNumber()
  element_id_bottom: number;

  @IsNotEmpty()
  @IsNumber()
  background_id: number;

  @IsNotEmpty()
  @IsNumber()
  frame_id: number;

  @IsNotEmpty()
  @IsNumber()
  animation_id: number;

  @IsNotEmpty()
  @IsNumber()
  color_id: number;

  @IsNotEmpty()
  @IsString()
  custom_template_name: string;
}

export class CustomTemplateUpdateDto {
  @IsOptional()
  @IsNumber()
  element_id_top: number;

  @IsOptional()
  @IsNumber()
  element_id_bottom: number;

  @IsOptional()
  @IsNumber()
  background_id: number;

  @IsOptional()
  @IsNumber()
  frame_id: number;

  @IsOptional()
  @IsNumber()
  animation_id: number;

  @IsOptional()
  @IsNumber()
  color_id: number;

  @IsNotEmpty()
  @IsString()
  custom_template_name: string;
}
