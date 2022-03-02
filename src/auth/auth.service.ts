import { CreateBlacklistDto } from './../app/blacklist/dto/create-blacklist.dto';
import { BlacklistService } from './../app/blacklist/blacklist.service';
import { UsersEntity } from '../app/users/entities/users.entity';
import { UsersService } from './../app/users/users.service';
import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
  ) {}

  async login(user: UsersEntity) {
    const payload = { sub: user.id };

    return {
      token: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_DATE,
      }),
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

  getCookieWithJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_DATE}`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: process.env.JWT_REFRESH_EXPIRATION_DATE,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_EXPIRATION_DATE}`;
    return {
      cookie,
      token,
    };
  }
}
