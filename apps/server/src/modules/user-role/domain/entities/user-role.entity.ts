import { RoleEntity } from '@/modules/role/domain/entities/role.entity';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { BaseEntity } from '@/shared/domains/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('user_roles')
export class UserRoleEntity extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ name: 'role_id', type: 'uuid' })
  roleId!: string;

  @ManyToOne(() => UserEntity, (user) => user.userRoles)
  user!: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.userRoles)
  role!: RoleEntity;
}
