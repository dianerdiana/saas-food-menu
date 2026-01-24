import { StoreEntity } from '@/modules/store/domain/entities/store.entity';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { AuthUser } from '@/shared/types/auth-user.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthProjectionService {
  buildUserData(user: UserEntity, store?: StoreEntity) {
    const permissions = user.userRoles.flatMap((ur) =>
      ur.role.rolePermissions.map((rp) => {
        const permission = rp.permission;
        return {
          action: permission.action,
          subject: permission.subject,
        };
      }),
    );
    const roles = user.userRoles.map((userRole) => userRole.role.name);

    return {
      ...user,
      storeId: store?.id || '',
      storeName: store?.slug || '',
      roles,
      permissions,
    };
  }

  buildJwtPayload(user: UserEntity, store?: StoreEntity): AuthUser {
    return {
      userId: user.id,
      email: user.email,
      username: user.username,
      storeId: store?.id || '',
      storeName: store?.name || '',
    };
  }
}
