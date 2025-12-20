import { Role } from '@/modules/role/domain/entities/role.entity';
import { User } from '@/modules/user/domain/enitities/user.entity';
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

@Entity('user_roles')
export class UserRole {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'varchar', length: 36 })
  userId!: string;

  @Column({ name: 'role_id', type: 'varchar', length: 36 })
  roleId!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.userRoles)
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role!: Role;

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
