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

@Entity('products')
export class Product {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'store_id', type: 'varchar', length: 36 })
  storeId!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  slug!: string;

  @Column({ type: 'varchar', length: 255 })
  image!: string;

  @Column({ type: 'decimal', length: 255 })
  price!: number;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy!: string;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy!: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
