
export class EventModel {

  public static readonly urlCreate = 'events/save-event.php';
  public static readonly urlGetByPlacesId = 'events/get-events-by-places-id.php'
  public static readonly urlDelete = 'events/delete-event.php';

  public id: number;
  public name: string;
  public date: Date;
  public placesId: number;

  public constructor(init: Partial<EventModel>) {
    if (init) {
      this.id = init.id;
      this.name = init.name;
      this.date = new Date(init.date);
      this.placesId = init.placesId;
    }
  }

}
