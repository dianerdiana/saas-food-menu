import { Role } from '@/modules/role/domain/entities/role.entity';
import { User } from '@/modules/user/domain/enitities/user.entity';
import { BaseEntity } from '@/shared/domains/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('user_roles')
export class UserRole extends BaseEntity {
  @Column({ name: 'user_id', type: 'varchar', length: 36 })
  userId!: string;

  @Column({ name: 'role_id', type: 'varchar', length: 36 })
  roleId!: string;

  @ManyToOne(() => User, (user) => user.userRoles)
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role!: Role;
}
