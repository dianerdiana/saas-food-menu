export enum SubjectControl {
  Bank = 'Bank',
  Store = 'Store',
}

export type Subject = typeof SubjectControl;

export enum ActionControl {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export interface RequiredRule {
  action: ActionControl;
  subject: SubjectControl;
}
