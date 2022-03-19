import { PartialType } from '@nestjs/mapped-types';
import LogInDto from './login.dto';

export class RegisterDto extends PartialType(LogInDto) {}
