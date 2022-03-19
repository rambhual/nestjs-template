import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserService } from '../user/user.service'
import { Repository } from 'typeorm'
import { CreateResetDto } from './dto/create-reset.dto'
import { UpdateResetDto } from './dto/update-reset.dto'
import { Reset } from './entities/reset.entity'
import passport from 'passport'

@Injectable()
export class ResetService {
  constructor(
    @InjectRepository(Reset) private readonly resetRepo: Repository<Reset>,
    private readonly userService: UserService
  ) { }


  create(createResetDto: CreateResetDto) {
    return this.resetRepo.save(createResetDto)
  }

  findAll() {
    return this.resetRepo.find()
  }

  findOne(id: string) {
    return this.resetRepo.findOne(id)
  }

  findOneByToken(token: string) {
    return this.resetRepo.findOne({
      where: {
        token
      }
    })
  }

  async update(token: string, updateResetDto: UpdateResetDto) {

    const reset = await this.findOneByToken(token)

    if (!reset) {
      throw new NotFoundException("token not found");
    }

    const user = await this.userService.findUserByEmail(reset.email)

    if (!user) {
      throw new NotFoundException("user not found");
    }

    await this.userService.updatePassword(user.id, updateResetDto.password)

    return {
      message: "Password updated sucessfully"
    }

  }

  remove(id: string) {
    return this.resetRepo.delete(id)
  }
}
