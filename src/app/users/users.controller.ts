import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(201)
  async index() {
    return await this.usersService.index();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body) {
    return await this.usersService.create(body);
  }

  @Get(':id')
  @HttpCode(201)
  async show(@Param('id') id: string) {
    return await this.usersService.show(id);
  }

  @Put(':id')
  @HttpCode(201)
  async update(@Param('id') id: string, @Body() body) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    await this.usersService.delete(id);
  }
}
