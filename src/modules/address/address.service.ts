import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto, UpdateAddressDto } from './dtos/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {}

  async addAddress(data: CreateAddressDto, user: string): Promise<Address> {
    const address = this.addressRepo.create({ ...data, user: { id: user } });
    return await this.addressRepo.save(address);
  }

  async getAddressById(
    id: string,
    withUser: boolean = false,
  ): Promise<Address> {
    const address = await this.addressRepo.findOne({
      where: { id },
      relations: withUser ? ['user'] : [],
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async getAddressByUserId(id: string): Promise<Address[]> {
    const addresses = await this.addressRepo.find({
      where: {
        user: {
          id,
        },
      },
    });

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException('Address not found');
    }

    return addresses;
  }

  async deleteAddress(id: string) {
    const result = await this.addressRepo.delete({
      id,
    });

    if (!result.affected) {
      throw new NotFoundException('Address not found');
    }
  }

  async getAllAddresses(page: number = 0, limit: number = 5) {
    const [data, total] = await this.addressRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'desc',
      },
      relations: ['user'],
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateAddress(
    id: string,
    data: UpdateAddressDto,
    userId: string,
  ): Promise<Address> {
    const address = await this.getAddressById(id, true);

    if (userId !== address.user.id) {
      throw new ForbiddenException(
        'You do not have permission to update this address',
      );
    }

    const updatedAddress = this.addressRepo.merge(address, data);
    try {
      return await this.addressRepo.save(updatedAddress);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update the address');
    }
  }
}
