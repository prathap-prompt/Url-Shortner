import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}