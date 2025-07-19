import { registerAs } from '@nestjs/config';

export const swaggerConfigName = 'swaggerConfig';

export interface SwaggerConfig {
  login: string;
  password: string;
}

export const swaggerConfig = registerAs(swaggerConfigName, () => ({
  login: process.env.SWAGGER_LOGIN,
  password: process.env.SWAGGER_PW,
}));
