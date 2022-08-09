import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  first_name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  last_name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}
