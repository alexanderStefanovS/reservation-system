import { Component, OnInit, ViewChild } from '@angular/core';
import {DataLoaderService} from '../../services/data-loader.service';
import {PlaceModel} from '../../models/place-model';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { EventModel } from 'src/app/models/event-model';
import { FoodModel } from 'src/app/models/food-model';
import { PlaceTypesModel } from 'src/app/models/place-types-model';
import { ReservationModel } from 'src/app/models/reservation-model';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-users-view-panel',
  templateUrl: './users-view-panel.component.html',
  styleUrls: ['./users-view-panel.component.css']
})
export class UsersViewPanelComponent implements OnInit {

  public time: string;
  public date: NgbDate;
  public isFoodCollapsed = true;
  public isVisibleToast = false;
  public isDrinkCollapsed = true;
  public message: string;
  public selectedPlace: PlaceModel;
  public places: PlaceModel[] = [];
  public selectedTypes: number[] = [];
  public selectedPlaces: PlaceModel[];
  public placeTypes: PlaceTypesModel[] = [];
  public userReservations: ReservationModel[] = [];
  public reservation: ReservationModel = new ReservationModel({});

  @ViewChild('successSwal') public successSwal: SwalComponent;

  constructor(private dataLoader: DataLoaderService) {
    const today = new Date();
    this.date = new NgbDate(today.getFullYear(), today.getMonth(), today.getDate());
    this.time = today.getHours() + ':' + today.getMinutes() + ':00';
  }

  ngOnInit(): void {
    this.loadPlaces();
    this.loadPlaceTypes();
    this.loadUserReservations();
  }

  private loadUserReservations() {
    const usersId = +sessionStorage.getItem('usersId');
    this.dataLoader.loadByParam(ReservationModel.urlGetByUsersId, `usersId=${usersId}`)
      .subscribe((data: any) => {
        data.value.forEach((res: ReservationModel) => {
          this.userReservations.push(new ReservationModel(res));
        });
        this.userReservations.forEach(res => {
          this.loadReservationPlace(res);
        });
      });
  }

  loadReservationPlace(reservation: ReservationModel) {
    const id = reservation.placesId;
    this.dataLoader.loadByParam(PlaceModel.urlGet, `id=${id}`)
      .subscribe((data: any) => {
        reservation.place = data.value;
      });
  }

  private loadPlaces() {
    this.dataLoader.loadAll(PlaceModel.urlGetAll)
      .subscribe((data: any) => {
        data.value.forEach((place: PlaceModel) => {
          this.places.push(new PlaceModel(place));
        });
        this.selectedPlaces = this.places
        this.selectedPlaces.length && this.onSelectPlace(this.selectedPlaces[0], 0);
      })
  }

  private loadFoods(placesId: number, index: number) {
    this.dataLoader.loadByParam(FoodModel.urlGet, `placesId=${placesId}&type=F`)
      .subscribe((data: any) => {
        this.places[index].menu.foods = data.value;
      });
  }

  private loadDrinks(placesId: number, index: number) {
    this.dataLoader.loadByParam(FoodModel.urlGet, `placesId=${placesId}&type=D`)
      .subscribe((data: any) => {
        this.places[index].menu.drinks = data.value;
      });
  }

  private loadEvents(placesId: number, index: number) {
    this.dataLoader.loadByParam(EventModel.urlGetByPlacesId, `placesId=${placesId}`)
      .subscribe((data: any) => {
        this.places[index].events = [];
        data.value.forEach((event: EventModel) => {
          this.places[index].events.push(new EventModel(event));
        });
      });
  }

  private loadPlaceTypes() {
    this.dataLoader.loadAll(PlaceTypesModel.urlLoad)
      .subscribe((data: any) => {
        data.value.forEach((type: PlaceTypesModel) => {
          this.placeTypes.push(new PlaceTypesModel(type));
        });
        this.addTypes();
      })
  }

  private addTypes() {
    this.placeTypes.forEach(type => {
      this.selectedTypes.push(type.id);
    });
  }

  onSelectPlace(place: PlaceModel, index: number) {
    this.selectedPlace = place;
    this.loadDrinks(this.selectedPlace.id, index);
    this.loadFoods(this.selectedPlace.id, index);
    this.loadEvents(this.selectedPlace.id, index);
  }

  onTypeChecked(value: number, index: number) {
    this.placeTypes[index].isChecked = !this.placeTypes[index].isChecked;
    if (this.placeTypes[index].isChecked) {
      this.selectedTypes.push(value);
    } else {
      this.selectedTypes = this.selectedTypes.filter(type => type !== value);
    }
    this.filerPlacesByType();
  }

  filerPlacesByType() {
    this.selectedPlaces = this.places.filter(
      (place) => {
        if (this.selectedTypes.includes(place.placeTypesId)) {
          return place;
        }
    });
    this.onSelectPlace(this.selectedPlaces[0], 0);
  }

  onSearchPlace(searchValue: string) {
    if (searchValue.trim().length < 1) {
      this.filerPlacesByType();
      return;
    }
    this.selectedPlaces = this.selectedPlaces.filter((place: PlaceModel) => {
      return (place.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
    });
    this.onSelectPlace(this.selectedPlaces[0], 0);
  }

  reserve() {
    this.prepareReservationDate();
    this.reservation.usersId = +sessionStorage.getItem('usersId');
    this.reservation.placesId = this.selectedPlace.id;

    this.dataLoader.create(ReservationModel.urlCreate, this.reservation)
      .subscribe((data: any) => {
        console.log(data);
        this.message = data.message;
        this.successSwal.fire();
        location.reload();
      });
  }

  private prepareReservationDate() {
    const dateString = `${this.date.year}-${this.date.month}-${this.date.day}`;
    this.reservation.date = new Date(Date.parse(dateString));
    const hours: number = +this.time.substring(0, this.time.indexOf(':'));
    const minutes: number = +this.time.substring(this.time.indexOf(':') + 1, this.time.indexOf(':') + 3);
    this.reservation.date.setHours(hours, minutes);
  }
}
