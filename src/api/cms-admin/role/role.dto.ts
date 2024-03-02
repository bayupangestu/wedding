import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
