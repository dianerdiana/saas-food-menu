export class UserModel {
  id!: string;
  firstName!: string;
  lastName!: string;
  username!: string;
  password!: string;

  constructor(partial: Partial<UserModel>) {
    Object.assign(this, partial);
  }
}
