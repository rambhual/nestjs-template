import { RoleEnum } from '../entities/user.entity';

export interface UserResponse {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: RoleEnum;
}
