import { registerAs } from '@nestjs/config';

export const tokenConfigName = 'tokenConfig';

export interface TokenConfig {
  secret: string;
  expireIn: string | number;
  issuer?: string;
  audience?: string;
  algorithm?: string;
}

export const tokenConfig = registerAs(tokenConfigName, () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRY,
  issuer: process.env.JWT_ISSUER || '',
  audience: process.env.JWT_AUDIENCE || '',
  algorithm: process.env.JWT_ALGORITHM || 'HS256',
}));
