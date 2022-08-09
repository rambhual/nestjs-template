import { UserResponse } from '@core/user/dto/user-response';
import { Controller, Post, UseGuards, Req, Res, Get, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TokenService } from '../user/token.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import LogInDto from './dto/login.dto';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserRequest } from './interface/user-request';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly jwt: JwtService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @ApiBody({ type: LogInDto })
  async login(@Req() req: UserRequest, @Res({ passthrough: true }) res: Response) {
    const access_token = this.authService.generateAccessToken(req.user)
    const refresh_token = this.authService.generateRefreshToken(req.user)

    res.cookie('access_token', access_token, { httpOnly: true, maxAge: 3600 })
    res.cookie('refresh_token', refresh_token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

    const expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + 7)

    await this.tokenService.createToken({
      user_id: req.user?.id,
      token: refresh_token,
      expired_at: expireDate
    })

    return {
      access_token
    }
  }

  @Get('profile')
  getProfile(@CurrentUser() user: UserResponse) {
    return this.userService.findUserById(user?.id)
  }

  @Post('refresh-token')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Req() req: UserRequest) {
    const access_token = this.authService.generateAccessToken(req.user)
    const user = await this.userService.findUserById(req.user?.id)
    const refreshToken = req.cookies['refresh_token']
    const { id } = this.jwt.verify(refreshToken)
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
  async logout(@Req() req: UserRequest, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token')
    await this.tokenService.deleteByUserId(req.user.id)
    return {
      message: 'success'
    }
  }


}
