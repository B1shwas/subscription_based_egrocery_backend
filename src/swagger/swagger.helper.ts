import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiOk(description = 'Request successful') {
  return ApiResponse({
    status: HttpStatus.OK,
    description,
  });
}

export function ApiCreated(description = 'Resource created successfully') {
  return ApiResponse({
    status: HttpStatus.CREATED,
    description,
  });
}

export function ApiNoContent(description = 'No content') {
  return ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description,
  });
}

export function ApiBadRequestError(description = 'Bad request') {
  return ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description,
  });
}

export function ApiUnauthorized(description = 'Unauthorized') {
  return ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description,
  });
}

export function ApiForbidden(description = 'Forbidden') {
  return ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description,
  });
}

export function ApiNotFoundError(description = 'Not found') {
  return ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description,
  });
}

export function ApiConflict(description = 'Conflict') {
  return ApiResponse({
    status: HttpStatus.CONFLICT,
    description,
  });
}

export function ApiInternalServerError(description = 'Internal server error') {
  return ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description,
  });
}
