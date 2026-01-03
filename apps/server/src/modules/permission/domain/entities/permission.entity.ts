import { RolePermissionEntity } from '@/modules/role-permission/domain/entities/role-permission.entity';
import { BaseEntity } from '@/shared/domains/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('permissions')
export class PermissionEntity extends BaseEntity {
  static readonly modelName = 'Permission';

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100 })
  action!: string;

  @Column({ type: 'varchar', length: 100 })
  subject!: string;

  @Column({ type: 'text', nullable: true })
  conditions?: string | null;

  @Column({ type: 'boolean', default: false })
  inverted!: boolean;

  @Column({ type: 'text', nullable: true })
  reason?: string | null;

  @OneToMany(() => RolePermissionEntity, (rolePermission) => rolePermission.permission)
  rolePermissions!: RolePermissionEntity[];
}
