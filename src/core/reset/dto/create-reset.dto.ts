import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateResetDto {
    @IsNotEmpty()
    @IsEmail()
    email: string
}
