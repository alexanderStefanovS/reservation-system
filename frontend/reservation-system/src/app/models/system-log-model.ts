import { UserModel } from "./user-model";

export class SystemLogModel {

  public static readonly urlSearch = 'system-log/search-log.php';

  public id: number;
  public date: Date;
  public usersId: number;
  public description: string;
  public user: UserModel;

  constructor(init: Partial<SystemLogModel>) {
    if (init) {
      this.id = init.id;
      this.usersId = init.usersId;
      this.date = new Date(init.date);
      this.description = init.description;
      this.user = null;
    }
  }

}
