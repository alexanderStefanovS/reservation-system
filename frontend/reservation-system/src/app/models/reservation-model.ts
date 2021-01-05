import { PlaceModel } from "./place-model";
import { UserModel } from "./user-model";

export class ReservationModel {

  public static readonly urlCreate = 'reservations/save-reservation.php';
  public static readonly urlGetByPlacesId = 'reservations/get-reservations-by-places-id.php';
  public static readonly urlGetByUsersId = 'reservations/get-reservations-by-users-id.php';
  public static readonly urlManage = 'reservations/manage-reservation.php';

  public id: number
  public usersId: number;
  public placesId: number;
  public date: Date;
  public numOfPeople: number;
  public user: UserModel;
  public place: PlaceModel;
  public isApproved: number;

  public constructor(init: Partial<ReservationModel>) {
    if (init) {
      this.id = init.id;
      this.usersId = init.usersId;
      this.date = new Date(init.date);
      this.placesId = init.placesId;
      this.numOfPeople = init.numOfPeople ? init.numOfPeople : 0;
      this.user = null;
      this.place = null;
      this.isApproved = init.isApproved;
    }
  }

}
