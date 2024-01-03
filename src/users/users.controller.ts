import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users') //
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(+id);
  }

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
    return this.usersService.create(createUserDTO);
  }
}
