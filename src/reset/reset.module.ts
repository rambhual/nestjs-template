import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reset } from './entities/reset.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reset]),
  MailerModule.forRoot({
    transport: {
      host: "localhost",
      port: 1025
    },
    defaults: {
      from: "no-reply@oclm.com"
    }
  }),
    UserModule
  ],
  controllers: [ResetController],
  providers: [ResetService]
})
export class ResetModule { }
