
export class FoodModel {

  public static readonly urlCreate = 'foods/save-food.php'
  public static readonly urlDelete = 'foods/delete-food.php'
  public static readonly urlGet = 'foods/get-foods-by-place-id.php'

  public id: number;
  public name: string;
  public price: string;
  public type: string;
  public placesId: number

  public constructor(init: Partial<FoodModel>) {
    if (init) {
      this.id = init.id;
      this.name = init.name ? init.name : '';
      this.price = init.price ? init.price : '';
      this.type = init.type;
      this.placesId = init.placesId;
    }
  }

}
