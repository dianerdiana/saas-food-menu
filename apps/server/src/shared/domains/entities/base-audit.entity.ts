import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from '@/modules/user/domain/entities/user.entity';

export abstract class BaseAuditEntity extends BaseEntity {
  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator?: User | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updater?: User | null;
}
