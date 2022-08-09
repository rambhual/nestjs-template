
import { SetMetadata } from '@nestjs/common';
import { PostEntity } from '../post/entities/post.entity';
import { Action, Subjects } from './ability-factory.service';
export interface RequiredRule {
  action: Action,
  subject: Subjects
}
export const CHECK_ABILITY = 'check_ability'
export const CheckAbilities = (...requirements: RequiredRule[]) => SetMetadata(CHECK_ABILITY, requirements)

export class ReadPostAbility implements RequiredRule {
  action: Action.Read;
  subject: PostEntity;
}

export class DeletePostAbility implements RequiredRule {
  action: Action.Delete;
  subject: PostEntity;
}