import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export abstract class BaseAuditEntity extends BaseEntity {
  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string | null;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string | null;

  @Column({ name: 'deleted_by', type: 'uuid', nullable: true })
  deletedBy?: string | null;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  creator?: UserEntity | null;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'updated_by' })
  updater?: UserEntity | null;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'deleted_by' })
  deleter?: UserEntity | null;
}
