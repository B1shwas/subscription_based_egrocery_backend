import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { tokenConfig } from 'src/config';

export const jwtFactory: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [tokenConfig.KEY],
  useFactory: (config: ConfigType<typeof tokenConfig>) => ({
    secret: config.secret,
    signOptions: {
      expiresIn: config.expiresIn,
      algorithm: config.algorithm as any,
      ...(config.audience && { audience: config.audience }),
      ...(config.issuer && { issuer: config.issuer }),
    },
  }),
};
