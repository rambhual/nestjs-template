import { IsNotEmpty } from 'class-validator';

export class UpdateResetDto {
    @IsNotEmpty()
    password: string
}
