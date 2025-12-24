import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { ActionControl, Subject } from '../types/access-control.type';
import { PermissionEntity } from '@/modules/permission/domain/entities/permission.entity';
import { AbilityBuilder, createMongoAbility, MongoAbility, ExtractSubjectType } from '@casl/ability';
import { Injectable } from '@nestjs/common';

export type AppAbility = MongoAbility<[ActionControl, Subject]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity, permissions: PermissionEntity[]) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    permissions.forEach((permission) => {
      let conditions = permission.conditions;

      if (conditions && typeof conditions === 'string') {
        const replaced = conditions.replace(/{{current_user_id}}/g, user.id);
        conditions = JSON.parse(replaced);
      }

      if (permission.inverted) {
        cannot(permission.action, permission.subject, conditions !== null ? conditions : '');
      } else {
        can(permission.action, permission.subject, conditions !== null ? conditions : '');
      }
    });

    return build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subject>,
    });
  }
}
