import { Store } from '@/modules/store/domain/entities/store.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity('subscriptions')
export class Subscription {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'store_id', type: 'varchar', length: 36 })
  storeId!: string;

  @Column({ name: 'user_id', type: 'varchar', length: 36 })
  userId!: string;

  @Column({ type: 'varchar', length: 50 })
  status!: string;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startData!: Date;

  @Column({ name: 'end_date', type: 'timestamptz' })
  endDate!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy!: string;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy!: string;

  @ManyToOne(() => Store, (store) => store.subscriptions)
  @JoinColumn({ name: 'store_id' })
  store!: Store;

  @BeforeInsert()
  generateId() {
    this.id = uuidv7();
  }
}
