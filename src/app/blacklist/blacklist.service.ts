import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlacklistEntity } from './entities/blacklist.entity';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(BlacklistEntity)
    private readonly blacklistRepository: Repository<BlacklistEntity>,
  ) {}

  async store(data: CreateBlacklistDto) {
    const token = this.blacklistRepository.create(data);
    return await this.blacklistRepository.save(token);
  }
}
