import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({
    example: 'user12345',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(7)
  password: string;
}
