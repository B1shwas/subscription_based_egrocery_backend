import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiLogin } from './swagger/auth.swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiLogin()
  @Public()
  @Post('login')
  async login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }
}
