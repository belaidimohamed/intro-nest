// src/dto/update-user.dto.ts
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  workAddress?: string;

  @IsOptional()
  @IsNotEmpty()
  homeAddress?: string;
}
