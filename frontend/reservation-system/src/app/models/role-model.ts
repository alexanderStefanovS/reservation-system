
export class RoleModel {

  public static readonly urlLoad = 'roles/get-roles.php';
  public static readonly urlGet = 'roles/get-role.php';

  public id: string;
  public name: string;
  public code: string;

  constructor(init: Partial<RoleModel>) {
    Object.assign(this, init || {} as RoleModel);
  }

}
