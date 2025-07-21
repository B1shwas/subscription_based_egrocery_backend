import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AddressCategory, AddressType } from '../enum/addrees-type.enum';

export class CreateAddressDto {
  @ApiProperty({
    example: 'Bagmati',
  })
  @IsString()
  @IsNotEmpty()
  province: string;

  @ApiProperty({
    example: 'Kathmandu',
  })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({
    example: 'Baneshwor',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'Shantinagar Marg',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    example: AddressType.BILLING,
    enum: AddressType,
  })
  @IsEnum(AddressType)
  @IsNotEmpty()
  addressType: AddressType;

  @ApiProperty({
    example: '44600',
    required: false,
  })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({
    example: 'home',
    enum: AddressCategory,
    default: AddressCategory.HOME,
  })
  @IsEnum(AddressCategory)
  @IsNotEmpty()
  addressCategory: AddressCategory;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
