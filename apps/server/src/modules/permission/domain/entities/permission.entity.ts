import { RolePermission } from '@/modules/role-permission/domain/entities/role-permission.entity';
import { BaseEntity } from '@/shared/domains/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100 })
  action!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  subject!: string;

  @Column({ type: 'text', nullable: true })
  conditions!: string;

  @Column({ type: 'boolean', default: false })
  inverted!: string;

  @Column({ type: 'text', nullable: true })
  reason!: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permissionId,
  )
  rolePermissions!: RolePermission[];
}
