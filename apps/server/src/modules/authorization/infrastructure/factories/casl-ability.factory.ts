import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { PermissionEntity } from '@/modules/permission/domain/entities/permission.entity';
import { StoreEntity } from '@/modules/store/domain/entities/store.entity';
import { CategoryEntity } from '@/modules/category/domain/entities/category.entity';

import { AbilityBuilder, createMongoAbility, MongoAbility, ExtractSubjectType } from '@casl/ability';

import { Action, Subject } from '@/shared/enums/access-control.enum';

export type Subjects = Subject | StoreEntity | UserEntity | CategoryEntity;
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity, permissions: PermissionEntity[], storeId: string): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    permissions.forEach((permission) => {
      const conditions = this.parseConditions(permission.conditions, user, storeId);

      const finalConditions = conditions ?? undefined;

      if (permission.inverted) {
        cannot(permission.action as Action, permission.subject as Subject, finalConditions);
      } else {
        can(permission.action as Action, permission.subject as Subject, finalConditions);
      }
    });

    return build({
      detectSubjectType: (item) =>
        (item.constructor as any).modelName || (item.constructor as unknown as ExtractSubjectType<Subjects>),
    });
  }

  private parseConditions(raw: string | null | undefined, user: UserEntity, storeId: string) {
    // 1. Jika kosong, tidak ada kondisi (akses diberikan secara luas)
    if (!raw) return undefined;

    try {
      // 2. Ganti placeholder dengan ID user yang sedang login
      const populated = raw.replace(/\$current_user_id/g, user.id).replace(/\$current_store_id/g, storeId);

      // 3. Parse menjadi objek JavaScript
      return JSON.parse(populated);
    } catch (error) {
      // 4. Jika JSON tidak valid, log ke terminal agar developer tahu
      // Tapi jangan biarkan aplikasi crash, kembalikan kondisi yang "mustahil"
      // agar akses ditolak demi keamanan.
      console.error(`CASL: Invalid JSON conditions for User ${user.id}:`, raw);

      // Mengembalikan kondisi yang tidak mungkin terpenuhi (akses ditolak)
      return { _unreachable_: true };
    }
  }
}
