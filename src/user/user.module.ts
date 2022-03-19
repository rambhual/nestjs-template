import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TokenEntity } from './entities/token.entity';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity])],
  controllers: [UserController],
  providers: [UserService, TokenService],
  exports: [UserService, TokenService],
})
export class UserModule { }
