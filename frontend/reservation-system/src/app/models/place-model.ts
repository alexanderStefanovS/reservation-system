import {MenuModel} from './menu-model';
import {EventModel} from './event-model';
import { ReservationModel } from './reservation-model';

export class PlaceModel {

  public static readonly urlCreate = 'places/save-place.php';
  public static readonly urlGetByUsersId = 'places/get-place-by-users-id.php';
  public static readonly urlUpdate = 'places/update-place-desc.php';
  public static readonly urlGetAll = 'places/get-all-places.php';
  public static readonly urlGet = 'places/get-place.php';

  public id: number;
  public name: string;
  public type: string;
  public description: string;
  public address: string;
  public placeTypesId: number;
  public menu: MenuModel;
  public events: EventModel[];
  public reservations: ReservationModel[];

  constructor(init: Partial<PlaceModel>) {
    if (init) {
      this.id = init.id;
      this.placeTypesId = init.placeTypesId;
      this.name = init.name;
      this.type = init.type;
      this.description = init.description ? init.description : '';
      this.address = init.address;
      this.menu = new MenuModel();
      this.events = [];
      this.reservations = [];
    }
  }

}
