import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { AuthUser } from '@/shared/types/auth-user.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthProjectionService {
  buildUserData(user: UserEntity, storeId: string) {
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

    return { ...user, storeId, roles, permissions };
  }

  buildJwtPayload(user: UserEntity, storeId: string): AuthUser {
    return {
      userId: user.id,
      email: user.email,
      username: user.username,
      storeId,
    };
  }
}
