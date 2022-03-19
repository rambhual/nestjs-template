import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetService } from './reset.service';
import { CreateResetDto } from './dto/create-reset.dto';
import { UpdateResetDto } from './dto/update-reset.dto';
import { Reset } from './entities/reset.entity';

@Controller('reset')
export class ResetController {
  constructor(private readonly resetService: ResetService,
    private readonly mailerService: MailerService
  ) { }

  @Post()
  async create(@Body() createResetDto: CreateResetDto) {
    const reset = new Reset()
    Object.assign(reset, createResetDto)
    reset.token = Math.random().toString(20).substring(2, 12)
    const url = `http://localhost:3100/api/v1/reset/${reset.token}`
    await this.mailerService.sendMail({
      to: createResetDto.email,
      subject: `Reset your password`,
      html: `Click <a href="${url}">here</a> to reset your password.`
    })
    await this.resetService.create(reset);
    return {
      message: "Please check youe email"
    }
  }

  @Get()
  findAll() {
    return this.resetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resetService.findOne(id);
  }

  @Patch(':token')
  update(@Param('token') token: string, @Body() updateResetDto: UpdateResetDto) {
    return this.resetService.update(token, updateResetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resetService.remove(id);
  }
}
