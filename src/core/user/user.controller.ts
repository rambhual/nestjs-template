import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Public } from '../auth/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/user-response';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Crud({
  model: {
    type: UserEntity,
  },
  dto: {
    create: CreateUserDto
  }
})
@Controller('users')
@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) { }

  @Public()
  @Post()
  createUser(
    @Body() userDto: CreateUserDto,
  ): Promise<UserResponse> {
    return this.service.createUser(userDto);
  }
}
