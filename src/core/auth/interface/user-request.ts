import { Request } from "express";
import { UserEntity } from "@core/user/entities/user.entity";

export interface UserRequest extends Request {
    user?: UserEntity
}