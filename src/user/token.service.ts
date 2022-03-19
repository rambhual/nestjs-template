/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';

@Injectable()
export class TokenService {

    constructor(@InjectRepository(TokenEntity) private readonly tokenRepo: Repository<TokenEntity>) {
    }

    createToken(data: any) {
        return this.tokenRepo.save(data)
    }

    async findByUserId(user_id: string) {
        return this.tokenRepo.findOne({ where: { user_id, expired_at: MoreThanOrEqual(new Date()) } })
    }

    async deleteByUserId(user_id: string) {
        return this.tokenRepo.delete({ user_id })
    }

}
