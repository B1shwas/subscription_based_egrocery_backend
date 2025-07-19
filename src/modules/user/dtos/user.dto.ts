import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { USER_ROLE } from 'src/modules/auth/enum/role.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'user12345',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'John',
  })
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({
    example: 'johndoe',
  })
  @IsNotEmpty()
  @MaxLength(100)
  username: string;

  @IsEnum(USER_ROLE)
  @IsOptional()
  role?: USER_ROLE;

  @IsOptional()
  @MaxLength(500)
  profileImage?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
