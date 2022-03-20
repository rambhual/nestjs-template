

import { ForbiddenError } from '@casl/ability';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactoryService } from './ability-factory.service';
import { CHECK_ABILITY, RequiredRule } from './ability.decorator';

@Injectable()
export class AbilityGuard implements CanActivate {

  constructor(private reflector: Reflector, private caslAbilityFactory: AbilityFactoryService) {
  }

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || []
    const { user } = context.switchToHttp().getRequest()
    const ability = this.caslAbilityFactory.defineAbility(user)
    try {
      rules.forEach(rule => ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject))
      return Promise.resolve(true);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
