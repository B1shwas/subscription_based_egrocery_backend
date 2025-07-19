import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, body, query, headers } = req;
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = headers['user-agent'] || 'unknown';
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;

      const message = `${method} ${originalUrl} ${statusCode} - ${duration}ms - IP: ${ip}`;
      const context = {
        method,
        path: originalUrl,
        statusCode,
        duration,
        ip,
        userAgent,
        query,
        body,
      };

      if (statusCode >= 500) {
        this.logger.error(message, JSON.stringify(context));
      } else if (statusCode >= 400) {
        this.logger.warn(message, JSON.stringify(context));
      } else {
        this.logger.log(message);
      }
    });

    next();
  }
}
