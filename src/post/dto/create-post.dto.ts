import { IsNotEmpty } from "class-validator"
import { Status } from "../entities/post.entity"

export class CreatePostDto {
    title: string
    status: Status
    content: string
    @IsNotEmpty()
    user_id: string
}
