import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const duplicate = await this.userRepo.findOne({
      where: {
        email: data.email,
        username: data.username,
      },
    });

    if (duplicate) {
      throw new BadRequestException(
        'User with given email or username already exists',
      );
    }

    const user = this.userRepo.create({ ...data });

    return this.userRepo.save(user);
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);

    if (data.username || data.email) {
      const duplicate = await this.userRepo.findOne({
        where: [
          { email: data.email, id: Not(id) },
          { username: data.username, id: Not(id) },
        ],
      });

      if (duplicate) {
        throw new BadRequestException(
          'User with given email or username already exists',
        );
      }
    }

    const updatedUser = this.userRepo.merge(user, data);
    return this.userRepo.save(updatedUser);
  }
}
