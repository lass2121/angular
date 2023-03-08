import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Province, City } from '../../interfaces/BookingData';

@Injectable({
  providedIn: 'root',
})
export class IcafeManagementService {
  dataProvince: Subject<Province[]> = new BehaviorSubject<Province[]>([]);
  dataCity: Subject<City[]> = new BehaviorSubject<City[]>([]);
  dataIcafe: Subject<any> = new BehaviorSubject([]);
  icafe: Subject<any> = new BehaviorSubject({});
  dataOrder: Subject<any> = new BehaviorSubject([]);
  visibleSidebar = false;

  isLoadingOrder = false;
  isLoadingCreateIcafe = false;
  isLoadingCreateOrder = false;

  isOrderSucceed = false;

  constructor(private http: HttpClient) {}

  getProvinceDDL() {
    this.http
      .get<Province[]>(`${environment.urlApiProvince}provinsi`)
      .subscribe({
        next: (resp: any) => {
          this.dataProvince.next(resp.provinsi);
        },
        error: (err) => {},
      });
  }

  getCityDDL(id: string) {
    this.http
      .get<City[]>(`${environment.urlApiProvince}kota?id_provinsi=${id}`)
      .subscribe({
        next: (resp: any) => {
          this.dataCity.next(resp.kota_kabupaten);
        },
        error: (err) => {},
      });
  }

  getIcafeLocation() {
    this.http.get<City[]>(`${environment.urlApi}/pc-data`).subscribe({
      next: (resp: any) => {
        this.dataIcafe.next(resp);
      },
      error: (err) => {},
    });
  }

  getSingleIcafeLocation(id: string) {
    this.http.get<City>(`${environment.urlApi}/pc-data/${id}`).subscribe({
      next: (resp: any) => {
        this.icafe.next(resp);
      },
      error: (err) => {},
    });
  }

  createNewIcafe(icafeData: any) {
    this.isLoadingCreateIcafe = true;
    this.http.post(`${environment.urlApi}/pc-data`, icafeData).subscribe({
      next: () => {
        this.getIcafeLocation();
      },
      error: (err) => {},
      complete: () => {
        this.isLoadingCreateIcafe = false;
      },
    });
  }

  deleteIcafe(id: any) {
    this.http.delete(`${environment.urlApi}/pc-data/${id}`).subscribe({
      next: () => {
        this.getIcafeLocation();
      },
      error: (err) => {},
    });
  }

  updateIcafe(id: string, icafeData: any) {
    this.isLoadingCreateIcafe = true;
    this.http.put(`${environment.urlApi}/pc-data/${id}`, icafeData).subscribe({
      next: () => {
        this.getIcafeLocation();
      },
      error: (err) => {},
      complete: () => {
        this.isLoadingCreateIcafe = false;
      },
    });
  }

  createNewOrder(bookingData: any) {
    this.isLoadingCreateOrder = true;
    this.http.post(`${environment.urlApi}/order`, bookingData).subscribe({
      next: (resp) => {
        this.isOrderSucceed = true;
      },
      error: (err) => {},
      complete: () => {
        this.isLoadingCreateOrder = false;
      },
    });
  }

  getOrderStatus(userId: string) {
    this.isLoadingOrder = true;
    let url = `${environment.urlApi}/order`;
    if (userId) url += `?userId=${userId}`;

    this.http.get(url).subscribe({
      next: (resp: any) => {
        this.isLoadingOrder = false;
        this.dataOrder.next(resp);
      },
      error: (err) => {},
      complete: () => {
        this.isLoadingOrder = false;
      },
    });
  }

  updateOrderStatus(id: string, orderData: any, type: string) {
    this.http.put(`${environment.urlApi}/order/${id}`, orderData).subscribe({
      next: (resp: any) => {
        this.getOrderStatus(type === 'user' ? resp.userId : '');
      },
      error: (err) => {},
    });
  }
}
