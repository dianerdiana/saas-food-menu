import { BankEntity } from '@/modules/bank/domain/entities/bank.entity';
import { CategoryEntity } from '@/modules/category/domain/entities/category.entity';
import { PermissionEntity } from '@/modules/permission/domain/entities/permission.entity';
import { InferSubjects } from '@casl/ability';

export type Subject = InferSubjects<typeof BankEntity | typeof CategoryEntity | 'all'>;
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export interface RequiredRule {
  action: string;
  subject: string;
}
