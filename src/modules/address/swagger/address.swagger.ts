import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ADDRESS_ID, USER_ID } from 'src/common/constants/constant';
import {
  ApiBadRequestError,
  ApiCreated,
  ApiForbidden,
  ApiInternalServerError,
  ApiNotFoundError,
  ApiOk,
} from 'src/swagger/swagger.helper';

export function ApiAddAddress() {
  return applyDecorators(
    ApiOperation({ summary: 'Add a new address for a user' }),
    ApiCreated('Address created successfully'),
    ApiBadRequestError('Invalid input data'),
    ApiInternalServerError(),
  );
}

export function ApiGetAddressById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get address by ID' }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Address ID',
      example: ADDRESS_ID,
    }),
    ApiOk('Address retrieved'),
    ApiNotFoundError('Address not found'),
    ApiInternalServerError(),
  );
}

export function ApiGetAddressByUserId() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all addresses for a user by user ID' }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'User ID',
      example: USER_ID,
    }),
    ApiOk('Addresses retrieved'),
    ApiNotFoundError('Addresses not found'),
    ApiInternalServerError(),
  );
}

export function ApiDeleteAddress() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete an address by ID' }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Address ID',
      example: ADDRESS_ID,
    }),
    ApiOk('Address deleted successfully'),
    ApiNotFoundError('Address not found'),
    ApiInternalServerError(),
  );
}

export function ApiGetAllAddresses() {
  return applyDecorators(
    ApiOperation({ summary: 'Get paginated list of all addresses' }),
    ApiQuery({
      name: 'page',
      type: Number,
      required: false,
      description: 'Page number',
      example: 0,
    }),
    ApiQuery({
      name: 'limit',
      type: Number,
      required: false,
      description: 'Number of addresses per page',
      example: 5,
    }),
    ApiOk('List of addresses with pagination'),
    ApiInternalServerError(),
  );
}

export function ApiUpdateAddress() {
  return applyDecorators(
    ApiOperation({ summary: 'Update an address by ID' }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'Address ID',
      example: ADDRESS_ID,
    }),
    ApiOk('Address updated successfully'),
    ApiBadRequestError('Invalid input data'),
    ApiForbidden('No permission to update this address'),
    ApiNotFoundError('Address not found'),
    ApiInternalServerError(),
  );
}
