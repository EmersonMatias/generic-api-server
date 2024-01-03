import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    return await this.userRepository.createUser(data);
  }
}
