import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

interface ErrorResponse {
  status: number;
  error: string | object;
  timestamp: string;
  path: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  private static readonly INTERNAL_SERVER_ERROR_MESSAGE =
    'Internal server error';
  private static readonly UNEXPECTED_ERROR_MESSAGE =
    'An unexpected error occurred';

  catch(exception: unknown, host: ArgumentsHost) {
    const httpContext = host.switchToHttp();
    const response = httpContext.getResponse();
    const request = httpContext.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | object;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse['message'] || exceptionResponse;
    } else if (exception instanceof Error) {
      this.logger.error(
        `Unhandled exception ${exception.message}`,
        exception.stack,
      );
      message = GlobalExceptionFilter.INTERNAL_SERVER_ERROR_MESSAGE;
    } else {
      this.logger.error('Unknown exception', JSON.stringify(exception));
      message = GlobalExceptionFilter.UNEXPECTED_ERROR_MESSAGE;
    }

    response.status(status).json({
      status,
      error: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    } as ErrorResponse);
  }
}
