import { CreateBlacklistDto } from './../app/blacklist/dto/create-blacklist.dto';
import { BlacklistService } from './../app/blacklist/blacklist.service';
import { UsersEntity } from '../app/users/entities/users.entity';
import { UsersService } from './../app/users/users.service';
import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.usersService.findOneOrFail({ email });
    } catch (error) {
      return null;
    }

    const isPasswordCorrect = compareSync(password, user.password);
    if (!isPasswordCorrect) return null;

    return user;
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async logout(data: CreateBlacklistDto) {
    await this.blacklistService.store(data);
  }
}
