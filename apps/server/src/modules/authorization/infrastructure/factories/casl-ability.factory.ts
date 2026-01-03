import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { PermissionEntity } from '@/modules/permission/domain/entities/permission.entity';

import { AbilityBuilder, createMongoAbility, MongoAbility, ExtractSubjectType } from '@casl/ability';

import type { Actions, Subjects } from '@/shared/types/access-control.type';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

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
      detectSubjectType: (item) =>
        (item.constructor as any).modelName || (item.constructor as unknown as ExtractSubjectType<Subjects>),
    });
  }

  private parseConditions(raw: string | null | undefined, user: UserEntity) {
    // 1. Jika kosong, tidak ada kondisi (akses diberikan secara luas)
    if (!raw) return undefined;

    try {
      // 2. Ganti placeholder dengan ID user yang sedang login
      const populated = raw.replace(/\$current_user_id/g, user.id);

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
