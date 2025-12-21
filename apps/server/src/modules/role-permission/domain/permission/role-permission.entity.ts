import { Permission } from '@/modules/permission/domain/permission/permission.entity';
import { Role } from '@/modules/role/domain/entities/role.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity('role_permissions')
export class RolePermission {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'role_id', type: 'varchar', length: 36 })
  roleId!: string;

  @Column({ name: 'permission_id', type: 'varchar', length: 36 })
  permissionId!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => Role, (role) => role.id)
  role!: Role;

  @ManyToOne(() => Permission, (permission) => permission.id)
  permission!: Permission;

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
