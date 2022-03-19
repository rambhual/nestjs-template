import { Controller, Post, UseGuards, Req, Res, Get, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenService } from '../user/token.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserRequest } from './interface/user-request';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly jwt: JwtService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: UserRequest, @Res({ passthrough: true }) res: Response) {
    const access_token = this.authService.generateAccessToken(req.user)
    const refresh_token = this.authService.generateRefreshToken(req.user)

    res.cookie('refresh_token', refresh_token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

    const expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + 7)

    await this.tokenService.createToken({
      user_id: req.user?.id,
      token: refresh_token,
      expired_at: expireDate
    })

    return {
      user: req.user,
      access_token
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    return this.userService.findUserById(req.user?.id)
  }

  @Post('refresh-token')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Req() req: UserRequest) {
    const access_token = this.authService.generateAccessToken(req.user)
    const user = await this.userService.findUserById(req.user?.id)
    const refresgToken = req.cookies['refresh_token']
    const { id } = this.jwt.verify(refresgToken)
    const tokenEntity = await this.tokenService.findByUserId(id)
    if (!tokenEntity) {
      throw new UnauthorizedException("");
    }
    return {
      user,
      access_token
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: UserRequest, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token')
    await this.tokenService.deleteByUserId(req.user.id)
    return {
      message: 'sucess'
    }
  }


}
