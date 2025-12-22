import { RolePermissionEntity } from '@/modules/role-permission/domain/entities/role-permission.entity';
import { UserRoleEntity } from '@/modules/user-role/domain/entities/user-role.entity';
import { BaseEntity } from '@/shared/domains/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
  userRoles!: UserRoleEntity[];

  @OneToMany(() => RolePermissionEntity, (rolePermission) => rolePermission.role)
  rolePermissions!: RolePermissionEntity[];
}
