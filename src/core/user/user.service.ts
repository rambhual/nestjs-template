import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { compareSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/user-response';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) public userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async createUser(userDto: CreateUserDto): Promise<UserResponse> {
    const user = new UserEntity();
    Object.assign(user, userDto);
    return await this.userRepository.save(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('user email or password incorrect');
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('user email or password incorrect');
    }
    return this.buildUserResponse(user);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async updatePassword(userId: string, password: string) {

    return this.userRepository.update(userId, {
      password: hashSync(password, 10)
    });
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("user not found exception");
    }
    return this.buildUserResponse(user);
  }

  async buildUserResponse(user: UserEntity): Promise<UserResponse> {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };
  }
}
