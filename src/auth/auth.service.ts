import { UsersEntity } from './../app/users/users.entity';
import { UsersService } from './../app/users/users.service';
import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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
}
