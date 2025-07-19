import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockUser = {
  id: '123',
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  email: 'johndoe@example.com',
  password: 'hashedPassword',
};

describe('UserService', () => {
  let service: UserService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const mockRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      merge: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should throw BadRequestException if user already exists', async () => {
      repo.findOne.mockResolvedValue(mockUser as User);

      await expect(
        service.createUser({
          email: mockUser.email,
          username: mockUser.username,
          password: 'test123',
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
        }),
      ).rejects.toThrow(BadRequestException);

      expect(repo.findOne).toHaveBeenCalledTimes(1);
    });

    it('should create and return a new user', async () => {
      repo.findOne.mockResolvedValue(null);
      repo.create.mockReturnValue(mockUser as User);
      repo.save.mockResolvedValue(mockUser as User);

      const result = await service.createUser({
        email: mockUser.email,
        username: mockUser.username,
        password: 'test123',
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
      });

      expect(repo.findOne).toHaveBeenCalledTimes(1);
      expect(repo.create).toHaveBeenCalledWith({
        email: mockUser.email,
        username: mockUser.username,
        password: 'test123',
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
      });
      expect(repo.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findUserById', () => {
    it('should throw NotFoundException if user not found', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.findUserById('non-existing-id')).rejects.toThrow(
        NotFoundException,
      );

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: 'non-existing-id' },
      });
    });

    it('should return user if found', async () => {
      repo.findOne.mockResolvedValue(mockUser as User);

      const result = await service.findUserById('123');
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '123' } });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findUserByEmail', () => {
    it('should throw NotFoundException if user not found', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(
        service.findUserByEmail('unknown@example.com'),
      ).rejects.toThrow(NotFoundException);

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { email: 'unknown@example.com' },
      });
    });

    it('should return user if found', async () => {
      repo.findOne.mockResolvedValue(mockUser as User);

      const result = await service.findUserByEmail(mockUser.email);
      expect(repo.findOne).toHaveBeenCalledWith({
        where: { email: mockUser.email },
      });
      expect(result).toEqual(mockUser);
    });
  });
});
