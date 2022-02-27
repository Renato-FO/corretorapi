import { UsersEntity } from './entity/users.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  UsersEntity: any;
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async index() {
    return await this.usersRepository.find();
  }

  async show(id: string) {
    try {
      return await this.usersRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data) {
    return await this.usersRepository.save(this.usersRepository.create(data));
  }

  async update(id: string, data) {
    const user = await this.usersRepository.findOneOrFail(id);

    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async delete(id: string) {
    await this.usersRepository.findOneOrFail(id);

    await this.usersRepository.softDelete(id);
  }
}
