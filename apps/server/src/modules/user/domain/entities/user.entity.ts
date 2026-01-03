import { StoreEntity } from '@/modules/store/domain/entities/store.entity';
import { SubscriptionEntity } from '@/modules/subscription/domain/entities/subscription.entity';
import { UserRoleEntity } from '@/modules/user-role/domain/entities/user-role.entity';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';
import { BaseAuditEntity } from '@/shared/domains/entities/base-audit.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseAuditEntity {
  static readonly modelName = 'User';

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

  @OneToMany(() => StoreEntity, (store) => store.user)
  stores!: StoreEntity[];

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  userRoles!: UserRoleEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.user)
  subscriptions!: SubscriptionEntity[];
}
