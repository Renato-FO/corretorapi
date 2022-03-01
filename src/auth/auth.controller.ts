import { AuthService } from './auth.service';
import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import RequestWithUser from './interfaces/requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() request: RequestWithUser, @Res() response: any) {
    response.setHeader(
      'Set-Cookie',
      this.authService.logout({
        token: request.headers.authorization.replace('Bearer ', ''),
      }),
    );
    return response.sendStatus(200);
  }
}
