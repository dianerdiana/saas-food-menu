import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar!: string;

  @Column({ name: 'full_name', type: 'varchar', length: 100, unique: true })
  fullName!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  phone!: string;

  @Column({ name: 'last_login', type: 'timestamptz', nullable: true })
  lastLogin!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 36, nullable: true })
  createdBy!: string;

  @Column({ name: 'updated_by', type: 'varchar', length: 36, nullable: true })
  updatedBy!: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
