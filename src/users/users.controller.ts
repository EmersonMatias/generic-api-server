import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users') //
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    )
    createUserDTO: CreateUserDTO,
  ) {
    return this.usersService.createUser(createUserDTO);
  }
}
