import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ApiInternalServerError,
  ApiOk,
  ApiUnauthorized,
} from 'src/swagger/swagger.helper';

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({ summary: 'Login user and return JWT access token' }),
    ApiOk('Login successful'),
    ApiUnauthorized('Invalid credentials'),
    ApiInternalServerError('Failed to generate JWT token'),
  );
}
