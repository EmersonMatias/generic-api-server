import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async create(data: CreateUserDTO) {
    const userExist = await this.findByEmail(data.email);

    if (userExist) throw new ConflictException('Email alredy exist.');

    const encryptedPassword = hashSync(data.password, 10);

    const newData: CreateUserDTO = {
      name: data.name.toLowerCase(),
      email: data.email.toLowerCase(),
      password: encryptedPassword,
    };

    return await this.userRepository.create(newData);
  }
}
