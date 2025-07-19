import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators/public.decorator';

import { Roles } from 'src/common/decorators/roles.decorator';
import { USER_ROLE } from '../auth/enum/role.enum';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('/signup')
  createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Public()
  @Post('/:id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Public()
  @Get('/email')
  findUserByEmail(@Query('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Roles(USER_ROLE.ADMIN)
  @Put('/update/:id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(id, data);
  }
}
