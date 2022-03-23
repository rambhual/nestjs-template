import { AbilityModule } from '@ability/ability.module';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '@core/user/user.module';
import { AuthModule } from '@core/auth/auth.module';
import { ResetModule } from '@core/reset/reset.module';
import { PostModule } from '@core/post/post.module';
import { CategoryModule } from '@core/category/category.module';
import { JwtAuthGuard } from '@core/auth/guard/jwt-auth.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AbilityModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ResetModule,
    PostModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService],
})
export class AppModule { }
