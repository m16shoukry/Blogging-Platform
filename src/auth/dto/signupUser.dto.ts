import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User_Role } from '../../user/interfaces/user.interface';

export class SignupUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: String,
    required: true,
    description: 'The email of the user',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the user',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    type: String,
    required: true,
    description: 'The password of the user',
  })
  password: string;

  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    enum: [User_Role],
    description: 'The role of the account',
  })
  role: 'reader'| 'editor';
}
