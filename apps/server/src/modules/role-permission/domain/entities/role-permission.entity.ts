import { Permission } from '@/modules/permission/domain/entities/permission.entity';
import { Role } from '@/modules/role/domain/entities/role.entity';
import { BaseEntity } from '@/shared/domains/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('role_permissions')
export class RolePermission extends BaseEntity {
  @Column({ name: 'role_id', type: 'uuid' })
  roleId!: string;

  @Column({ name: 'permission_id', type: 'uuid' })
  permissionId!: string;

  @ManyToOne(() => Role, (role) => role.id)
  role!: Role;

  @ManyToOne(() => Permission, (permission) => permission.id)
  permission!: Permission;
}
