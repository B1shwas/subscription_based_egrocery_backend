import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dtos/login-user.dto';
import { tokenConfig } from '../../config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject(tokenConfig.KEY)
    private readonly config: ConfigType<typeof tokenConfig>,
  ) {}

  private async generateToken(payload: {
    sub: string | number;
    username?: string;
    email?: string;
  }): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(payload);

      if (!token) {
        throw new InternalServerErrorException('Failed to generate JWT token');
      }

      return token;
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate JWT token');
    }
  }

  async validateUser(payload: LoginUserDto): Promise<User> {
    const { identifier, password } = payload;

    const user = await this.userRepo.findOne({
      where: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(payload: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(payload);

    const tokenPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = await this.generateToken(tokenPayload);

    return { accessToken };
  }
}
