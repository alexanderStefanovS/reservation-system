import { RoleModel } from "./role-model";

export class UserModel {

  public static readonly urlCreate = 'users/save-user.php';
  public static readonly urlLogin = 'login/login.php';
  public static readonly urlGet = 'users/get-user.php';
  public static readonly urlGetАll = 'users/get-users.php';

  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public password: string;
  public rolesId: string;
  public role: RoleModel;

  constructor(init: Partial<UserModel>) {
    if (init) {
      this.id = init.id;
      this.firstName = init.firstName;
      this.lastName = init.lastName;
      this.email = init.email;
      this.phone = init.phone;
      this.password = init.password;
      this.rolesId = init.rolesId;
      this.role = null;
    }
  }

}
