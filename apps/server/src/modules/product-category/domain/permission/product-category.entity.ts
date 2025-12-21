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

@Entity('product_categories')
export class ProductCategory {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'product_id', type: 'varchar', length: 36 })
  productId!: string;

  @Column({ name: 'category_id', type: 'varchar', length: 36 })
  categoryId!: string;

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
