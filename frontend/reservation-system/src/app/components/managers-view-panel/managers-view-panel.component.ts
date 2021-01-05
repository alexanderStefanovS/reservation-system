import {Component, OnInit, ViewChild} from '@angular/core';
import {PlaceModel} from '../../models/place-model';
import {DataLoaderService} from '../../services/data-loader.service';
import {FoodModel} from '../../models/food-model';
import {AddEventComponent} from '../../dialogs/add-event/add-event.component';
import {EventModel} from '../../models/event-model';
import {ReservationModel} from '../../models/reservation-model';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-managers-view-panel',
  templateUrl: './managers-view-panel.component.html',
  styleUrls: ['./managers-view-panel.component.css']
})
export class ManagersViewPanelComponent implements OnInit {

  public CHANGES_SAVED = 'Промените са запазени';
  public EVENT_ADDED = 'Събитието е записано';
  public EVENT_REMOVED = 'Събитието е премахнато';
  public RESERVATION_ACCEPTED = 'Резервацията е одобрена';
  public RESERVATION_DECLINED = 'Резервацията е отхвърлена';

  @ViewChild('addEvent', { static: false }) public addEvent: AddEventComponent;
  @ViewChild('successSwal') public successSwal: SwalComponent;
  @ViewChild('errorSwal') public errorSwal: SwalComponent;

  public place: PlaceModel = new PlaceModel({});
  public reservations: ReservationModel[];
  public message: string;

  public foodModel: FoodModel = new FoodModel({type: 'F'});
  public drinkModel: FoodModel = new FoodModel({type: 'D'});

  constructor(
    private dataLoader: DataLoaderService
  ) { }

  ngOnInit(): void {
    this.loadPlace();
  }

  loadPlace() {
    const usersId: number = +sessionStorage.getItem('usersId');
    this.dataLoader.loadByParam(PlaceModel.urlGetByUsersId, `usersId=${usersId}`)
      .subscribe((data: any) => {
        const place = data.value;
        this.place = new PlaceModel(place);
        this.loadDrinks();
        this.loadFoods();
        this.loadEvents();
        this.loadReservations();
      })
  }

  loadReservations() {
    const placesId: number = this.place.id;
    this.dataLoader.loadByParam(ReservationModel.urlGetByPlacesId, `placesId=${placesId}`)
      .subscribe((data: any) => {
        data.value.forEach((res: ReservationModel) => {
          this.place.reservations.push(new ReservationModel(res));
        });
        this.place.reservations.forEach(res => {
          this.loadReservationsUsers(res);
        });
      });
  }

  loadReservationsUsers(reservation: ReservationModel) {
    this.dataLoader.loadByParam(UserModel.urlGet, `id=${reservation.usersId}`)
      .subscribe((data: any) => {
        reservation.user = data.value;
      });
  }

  loadFoods() {
    const placesId: number = this.place.id;
    this.dataLoader.loadByParam(FoodModel.urlGet, `placesId=${placesId}&type=F`)
      .subscribe((data: any) => {
        this.place.menu.foods = data.value;
      });
  }

  loadDrinks() {
    const placesId: number = this.place.id;
    this.dataLoader.loadByParam(FoodModel.urlGet, `placesId=${placesId}&type=D`)
      .subscribe((data: any) => {
        this.place.menu.drinks = data.value;
      });
  }

  loadEvents() {
    const placesId: number = this.place.id;
    this.dataLoader.loadByParam(EventModel.urlGetByPlacesId, `placesId=${placesId}`)
      .subscribe((data: any) => {
        data.value.forEach((event: EventModel) => {
          this.place.events.push(new EventModel(event));
        });
      });
  }

  removeFood(id: number) {
    this.dataLoader.deleteById(FoodModel.urlDelete, id)
      .subscribe((data: any) => {
        this.place.menu.foods = this.place.menu.foods.filter(food => food.id !== id);
        this.message = data.message;
        this.successSwal.fire();
      });
  }

  removeDrink(id: number) {
    this.dataLoader.deleteById(FoodModel.urlDelete, id)
      .subscribe((data: any) => {
        this.place.menu.drinks = this.place.menu.drinks.filter(food => food.id !== id);
        this.message = data.message;
        this.successSwal.fire();
      });
  }

  addFood() {
    this.foodModel.placesId = this.place.id;
    this.dataLoader.create(FoodModel.urlCreate, this.foodModel)
      .subscribe((data: any) => {
        this.foodModel.id = +data.value;
        this.place.menu.foods.push(new FoodModel(this.foodModel));
        this.foodModel = new FoodModel({type: 'F'});
        this.message = data.message;
        this.successSwal.fire();
      });
  }

  addDrink() {
    this.drinkModel.placesId = this.place.id;
    this.dataLoader.create(FoodModel.urlCreate, this.drinkModel)
      .subscribe((data: any) => {
        this.drinkModel.id = +data.value;
        this.place.menu.drinks.push(new FoodModel(this.drinkModel));
        this.drinkModel = new FoodModel({type: 'D'});
        this.message = data.message;
        this.successSwal.fire();
      });
  }

  removeEvent(id: number) {
    this.dataLoader.deleteById(EventModel.urlDelete, id)
      .subscribe((data: any) => {
        this.place.events = this.place.events.filter(event => event.id !== id);
        this.message = data.message;
        this.successSwal.fire();
      });
  }

  openAddEventModal() {
    this.addEvent.open();
  }

  saveEvent(event: EventModel) {
    event.placesId = this.place.id;
    this.dataLoader.create(EventModel.urlCreate, event)
      .subscribe((data: any) => {
        event.id = +data.value;
        this.place.events.push(event);
        this.addEvent.close();
        this.message = data.message;
        this.successSwal.fire();
      });
  }

  acceptReservation(id: number) {
    this.dataLoader.updateByParam(ReservationModel.urlManage, `id=${id}&isApproved=1`)
      .subscribe( (data: any) => {
        this.message = data.message;
        this.successSwal.fire();
        this.place.reservations = this.place.reservations.filter(reservation => reservation.id !== id);
      });
  }

  declineReservation(id: number) {
    this.dataLoader.updateByParam(ReservationModel.urlManage, `id=${id}&isApproved=0`)
      .subscribe( (data: any) => {
        this.message = data.message;
        this.successSwal.fire();
        this.place.reservations = this.place.reservations.filter(reservation => reservation.id !== id);
      });
  }

  onSaveDescription() {
    const data = {description: this.place.description, id: this.place.id};
    this.dataLoader.update(PlaceModel.urlUpdate, data)
      .subscribe((data: any) => {
        this.message = data.message;
        this.successSwal.fire();
      });
  }
}
