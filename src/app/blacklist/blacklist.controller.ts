import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { Controller, Body, BadRequestException } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';

@Controller('blacklist')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  async store(@Body() body: CreateBlacklistDto) {
    try {
      return await this.blacklistService.store(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
