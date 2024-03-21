import { ApiProperty } from '@nestjs/swagger';
import {  IsString } from 'class-validator';
import {  User_Role } from '../interfaces/user.interface';

export class GetUserDto {
  @IsString()
  @ApiProperty({ type: String, description: 'User id' })
  _id: string;

  @IsString()
  @ApiProperty({ type: String, description: 'User name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'User email' })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'User role', enum: [User_Role] })
  role: User_Role;

  @IsString()
  @ApiProperty({ type: Date, description: 'User createdAt' })
  createdAt: Date;
}
