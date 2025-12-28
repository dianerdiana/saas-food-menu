import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { PermissionEntity } from '@/modules/permission/domain/entities/permission.entity';

import { AbilityBuilder, createMongoAbility, MongoAbility, ExtractSubjectType } from '@casl/ability';

import { ActionControl, Subject, SubjectControl } from '@/shared/types/access-control.type';

export type AppAbility = MongoAbility<[ActionControl, SubjectControl]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity, permissions: PermissionEntity[]) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    permissions.forEach((permission) => {
      const conditions = this.parseConditions(permission.conditions, user);

      const finalConditions = conditions ?? undefined;

      if (permission.inverted) {
        cannot(permission.action, permission.subject, finalConditions);
      } else {
        can(permission.action, permission.subject, finalConditions);
      }
    });

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subject>,
    });
  }

  private parseConditions(raw: string | null | undefined, user: UserEntity) {
    if (!raw || typeof raw !== 'string') return raw;

    return JSON.parse(raw.replace(/\$current_user_id/g, user.id));
  }
}
