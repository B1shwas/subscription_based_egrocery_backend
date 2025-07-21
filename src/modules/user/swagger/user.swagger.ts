import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { USER_EMAIL, USER_ID } from 'src/common/constants/constant';
import {
  ApiBadRequestError,
  ApiCreated,
  ApiForbidden,
  ApiInternalServerError,
  ApiNotFoundError,
  ApiOk,
} from 'src/documentation/swagger.helper';

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user' }),
    ApiCreated('User created successfully'),
    ApiBadRequestError('User with given email or username already exists'),
    ApiInternalServerError(),
  );
}

export function ApiFindUserById() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user by ID' }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'User ID',
      example: USER_ID,
    }),
    ApiOk('User found'),
    ApiNotFoundError('User not found'),
    ApiInternalServerError(),
  );
}

export function ApiFindUserByEmail() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user by email' }),
    ApiQuery({
      name: 'email',
      type: String,
      required: true,
      example: USER_EMAIL,
      description: 'Email address to search',
    }),
    ApiOk('User found'),
    ApiNotFoundError('User not found'),
    ApiInternalServerError(),
  );
}

export function ApiUpdateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Update user profile' }),
    ApiParam({
      name: 'id',
      type: String,
      description: 'User ID to update',
      example: USER_ID,
    }),
    ApiOk('User updated successfully'),
    ApiBadRequestError('Email or username already in use'),
    ApiForbidden('You are not allowed to do this action'),
    ApiNotFoundError('User not found'),
    ApiInternalServerError(),
  );
}
