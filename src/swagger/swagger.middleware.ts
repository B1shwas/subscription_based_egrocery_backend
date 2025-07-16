import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { SwaggerConfig, swaggerConfigName } from 'src/config/swagger.config';

@Injectable()
export class SwaggerAuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const swaggerConfig =
      this.configService.getOrThrow<SwaggerConfig>(swaggerConfigName);

    const login = swaggerConfig.login;
    const password = swaggerConfig.password;

    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [reqLogin, reqPassword] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':');

    if (reqLogin === login && reqPassword === password) {
      return next();
    }

    res.setHeader('WWW-Authenticate', 'Basic realm = Swagger');
    res.status(401).send('Login required to access docs');
  }
}
