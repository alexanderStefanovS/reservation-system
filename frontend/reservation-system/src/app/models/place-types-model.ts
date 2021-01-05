
export class PlaceTypesModel {

  public static readonly urlLoad = 'place-types/get-place-types.php';

  public id: number;
  public code: string;
  public type: string;
  public isChecked: boolean;

  constructor(init: Partial<PlaceTypesModel>) {
    if (init) {
      this.code = init.code;
      this.type = init.type;
      this.id = init.id;
      this.isChecked = true;
    }
  }

}
