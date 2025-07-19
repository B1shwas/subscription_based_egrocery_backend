import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiInternalServerError(
  description: string = 'Internal server error',
) {
  return ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description,
  });
}

export function ApiBadRequestError(description: string = 'Bad request') {
  return ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description,
  });
}

export function ApiNotFoundError(description: string = 'Not found') {
  return ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description,
  });
}


