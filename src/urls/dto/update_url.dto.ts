import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsUrl } from 'class-validator';
import { Create_urldto } from './create_url.dto';

export class UpdateUrlDto extends PartialType(Create_urldto){
  @IsOptional()
  @IsBoolean()
  isActive!:boolean
 
}