import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@core/user/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(private readonly jwt: JwtService) {
  }

  generateAccessToken(user: UserEntity) {
    return this.jwt.sign({ id: user.id, email: user.email, role: user.role })
  }

  generateRefreshToken(user: UserEntity) {
    return this.jwt.sign({ id: user.id, email: user.email, role: user.role }, { expiresIn: "7d" })
  }
}
