import { PermissionEntity } from '@/modules/permission/domain/entities/permission.entity';
import { RoleEntity } from '@/modules/role/domain/entities/role.entity';
import { BaseEntity } from '@/shared/domains/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('role_permissions')
export class RolePermissionEntity extends BaseEntity {
  @Column({ name: 'role_id', type: 'uuid' })
  roleId!: string;

  @Column({ name: 'permission_id', type: 'uuid' })
  permissionId!: string;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  role!: RoleEntity;

  @ManyToOne(() => PermissionEntity, (permission) => permission.id)
  permission!: PermissionEntity;
}
