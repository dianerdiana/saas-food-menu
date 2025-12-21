import { RolePermission } from '@/modules/role-permission/domain/entities/role-permission.entity';
import { UserRole } from '@/modules/user-role/domain/entities/user-role.entity';
import { BaseEntity } from '@/shared/domains/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @OneToMany(() => UserRole, (userRole) => userRole.roleId)
  userRoles!: UserRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.roleId)
  rolePermissions!: RolePermission[];
}
