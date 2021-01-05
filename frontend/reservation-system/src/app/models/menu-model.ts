import {FoodModel} from './food-model';

export class MenuModel {

  public foods: FoodModel[];
  public drinks: FoodModel[];

  constructor() {
    this.foods = [];
    this.drinks = [];
  }

}
