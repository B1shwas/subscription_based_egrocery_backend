import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { swaggerConfig } from 'src/config/swagger.config';

@Injectable()
export class SwaggerAuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(swaggerConfig.KEY) private config: ConfigType<typeof swaggerConfig>,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const login = this.config.login;
    const password = this.config.password;

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
