import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from './dtos/address.dto';
import { GetUser } from 'src/common/decorators/user.decorator';
import { USER_ROLE } from '../auth/enum/role.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  ApiAddAddress,
  ApiDeleteAddress,
  ApiGetAddressById,
  ApiGetAddressByUserId,
  ApiGetAllAddresses,
  ApiUpdateAddress,
} from './swagger/address.swagger';

@ApiBearerAuth()
@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiAddAddress()
  @Post('/add')
  addAddress(@Body() data: CreateAddressDto, @GetUser('id') userId: string) {
    return this.addressService.addAddress(data, userId);
  }

  @Public()
  @ApiGetAddressById()
  @Get('/:id')
  @ApiParam({ name: 'id', type: String, description: 'Address ID' })
  getAddressById(@Param('id') id: string, @GetUser('role') role: string) {
    const shouldReturnUserWithAddress = role === USER_ROLE.ADMIN;
    return this.addressService.getAddressById(id, shouldReturnUserWithAddress);
  }

  @ApiGetAddressByUserId()
  @Get()
  getAddressByUserId(@GetUser('id') userId: string) {
    return this.addressService.getAddressByUserId(userId);
  }

  @ApiUpdateAddress()
  @Put('/update/:id')
  @ApiParam({ name: 'id', type: String, description: 'Address ID to update' })
  updateAddress(
    @Param('id') id: string,
    @Body() data: UpdateAddressDto,
    @GetUser('id') userId: string,
  ) {
    return this.addressService.updateAddress(id, data, userId);
  }

  @ApiDeleteAddress()
  @Delete('/:id')
  @ApiParam({ name: 'id', type: String, description: 'Address ID to delete' })
  deleteAddress(@Param('id') id: string) {
    return this.addressService.deleteAddress(id);
  }

  @ApiGetAllAddresses()
  @Roles(USER_ROLE.ADMIN)
  @Get('/all')
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  getAllAddresses(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.addressService.getAllAddresses(page, limit);
  }
}
