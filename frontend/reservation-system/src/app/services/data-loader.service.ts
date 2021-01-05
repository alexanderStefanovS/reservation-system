import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  private readonly baseUrl = 'api/reservation-system-api/endpoints/';
  private http: HttpClient;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  public getPlaces(): Observable<any> {
    return this.http.get('./assets/resources/places.json');
  }

  public getReservations(): Observable<any> {
    return this.http.get('./assets/resources/reservations.json');
  }

  public getUsers(): Observable<any> {
    return this.http.get('./assets/resources/users.json');
  }

  public getTest() {
    const url = `${this.baseUrl}test.php`;
    return this.http.get(url);
  }

  public loadAll(urlSuffix: string) {
    const url = `${this.baseUrl}${urlSuffix}`;
    return this.http.get(url);
  }

  public create(urlSuffix: string, obj: any) {
    const url = `${this.baseUrl}${urlSuffix}`;
    return this.http.post(url, obj);
  }

  public loadByParam(urlSuffix: string, params: string) {
    const url = `${this.baseUrl}${urlSuffix}?${params}`;
    return this.http.get(url);
  }

  public deleteById(urlSuffix: string, id: number) {
    const url = `${this.baseUrl}${urlSuffix}?id=${id}`;
    return this.http.delete(url);
  }

  public update(urlSuffix: string, obj: any) {
    const url = `${this.baseUrl}${urlSuffix}`;
    return this.http.put(url, obj);
  }

  public updateByParam(urlSuffix: string, params: string) {
    const url = `${this.baseUrl}${urlSuffix}?${params}`;
    return this.http.get(url);
  }

}
