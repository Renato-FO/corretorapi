import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { BlacklistController } from './blacklist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistEntity } from './entities/blacklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistEntity])],
  controllers: [BlacklistController],
  providers: [BlacklistService],
  exports: [BlacklistService],
})
export class BlacklistModule {}
