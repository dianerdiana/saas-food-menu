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

@Entity('subscription_payments')
export class SubscriptionPayment {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'store_id', type: 'varchar', length: 36 })
  storeId!: string;

  @Column({ name: 'payment_method', type: 'varchar', length: 100 })
  paymentMethod!: string;

  @Column({ type: 'varchar', length: 255 })
  proof!: string;

  @Column({ name: 'bank_account', type: 'varchar', length: 100 })
  bankAccount!: string;

  @Column({ name: 'bank_name', type: 'varchar', length: 100 })
  bankName!: string;

  @Column({ name: 'bank_number', type: 'varchar', length: 100 })
  bankNumber!: string;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

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
