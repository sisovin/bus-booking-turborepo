import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);
    return res.status(HttpStatus.OK).json(tokens);
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.body.refreshToken;
    const tokens = await this.authService.refresh(refreshToken);
    return res.status(HttpStatus.OK).json(tokens);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.body.refreshToken;
    await this.authService.logout(refreshToken);
    return res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
  }
}
