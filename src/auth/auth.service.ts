import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private readonly jwt: JwtService) {
  }

  generateAccessToken(user: any) {
    return this.jwt.sign({ id: user.id, email: user.email })
  }

  generateRefreshToken(user: any) {
    return this.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "7d" })
  }
}
