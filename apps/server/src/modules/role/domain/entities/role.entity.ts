import { RolePermission } from '@/modules/role-permission/domain/permission/role-permission.entity';
import { UserRole } from '@/modules/user-role/domain/permission/user-role.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity('roles')
export class Role {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(() => UserRole, (userRole) => userRole.roleId)
  userRoles!: UserRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.roleId)
  rolePermissions!: RolePermission[];

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
