import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators/public.decorator';
import { GetUser } from 'src/common/decorators/user.decorator';
import {
  ApiCreateUser,
  ApiFindUserByEmail,
  ApiFindUserById,
  ApiUpdateUser,
} from './swagger/user.swagger';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCreateUser()
  @Public()
  @Post('/signup')
  createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @ApiFindUserById()
  @Public()
  @Post('/:id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @ApiFindUserByEmail()
  @Public()
  @Get('/email')
  findUserByEmail(@Query('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @ApiUpdateUser()
  @Put('/update/:id')
  updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @GetUser('id') userId: string,
  ) {
    return this.userService.updateUser(id, data, userId);
  }
}
