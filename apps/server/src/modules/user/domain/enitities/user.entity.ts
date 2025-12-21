import { Store } from '@/modules/store/domain/entities/store.entity';
import { UserRole } from '@/modules/user-role/domain/permission/user-role.entity';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';
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

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar!: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  phone!: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password!: string;

  @Column({ type: 'varchar', length: 50, default: GENERAL_STATUS.active })
  status!: string;

  @Column({ name: 'last_login', type: 'timestamptz', nullable: true })
  lastLogin!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy!: string;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy!: string;

  @OneToMany(() => Store, (store) => store.user)
  stores!: Store[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles!: UserRole[];

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
