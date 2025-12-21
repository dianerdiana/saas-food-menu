import { User } from '@/modules/user/domain/enitities/user.entity';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';
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

@Entity('stores')
export class Store {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'varchar', length: 36 })
  userId!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  image!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  phone!: string;

  @Column({ type: 'text', nullable: true })
  location!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'varchar', length: 50, default: GENERAL_STATUS.active })
  status!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy!: string;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy!: string;

  @ManyToOne(() => User, (user) => user.stores)
  user!: User;

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
