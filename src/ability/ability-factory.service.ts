

import { Ability, AbilityBuilder, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserEntity, RoleEnum } from '@core/user/entities/user.entity';
import { PostEntity, Status } from 'post/entities/post.entity';
import { Category } from 'category/entities/category.entity';

export enum Action {
    Manage = "manage",
    Create = "create",
    Update = "update",
    Read = "read",
    Delete = "delete",
}

export type Subjects = InferSubjects<typeof UserEntity | typeof PostEntity | typeof Category> | 'all'

@Injectable()
export class AbilityFactoryService {
    defineAbility(user: UserEntity) {
        const builder = new AbilityBuilder(Ability)
        if (user.role === RoleEnum.ADMIN) {
            builder.can(Action.Manage, 'all')
        } else {
            builder.can(Action.Read, PostEntity)
            builder.can(Action.Delete, PostEntity, { status: { $ne: Status.PUBLISHED } })
        }
        return builder.build({ detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects> })
    }
}
