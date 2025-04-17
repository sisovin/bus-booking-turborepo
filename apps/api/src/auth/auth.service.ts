import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async verifyPassword(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { username: loginDto.username, sub: loginDto.userId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken();
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    // Implement refresh token validation logic here
    const newAccessToken = this.jwtService.sign({ sub: 'userId' });
    const newRefreshToken = this.generateRefreshToken();
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string): Promise<void> {
    // Implement token invalidation logic here
  }

  private generateRefreshToken(): string {
    // Implement refresh token generation logic here
    return 'newRefreshToken';
  }
}
