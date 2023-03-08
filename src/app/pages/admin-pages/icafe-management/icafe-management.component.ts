import { Component, OnInit } from '@angular/core';

import { IcafeManagementService } from 'src/app/services/icafe-management/icafe-management.service';
import { Province, City } from '../../../interfaces/BookingData';

@Component({
  selector: 'app-icafe-management',
  templateUrl: './icafe-management.component.html',
  styleUrls: ['./icafe-management.component.css'],
})
export class IcafeManagementComponent implements OnInit {
  provinces: Province[] = [];

  cities: City[] = [];

  selectedProvince = {
    nama: '',
    id: '',
  };

  selectedCity = {
    id: '',
    id_provinsi: '',
    nama: '',
  };

  selectedIcafe: any = {};

  event: any = {};

  icafeList: any = [];
  filteredIcafe: any = [];

  constructor(public iCafeManagementService: IcafeManagementService) {}

  ngOnInit() {
    this.iCafeManagementService.getIcafeLocation();
    this.getIcafe();

    this.iCafeManagementService.getProvinceDDL();
    this.iCafeManagementService.dataProvince.subscribe((res) => {
      this.provinces = res;
    });
  }

  onChangeCountry(event: any) {
    this.iCafeManagementService.getCityDDL(event.value.id);

    this.iCafeManagementService.dataCity.subscribe((res) => {
      this.cities = res;
    });
  }

  onChangeCity(event: any) {
    this.event = event;

    this.getFilteredIcafe(this.event?.value.id_provinsi, this.event?.value.id);
  }

  getIcafe() {
    this.iCafeManagementService.dataIcafe.subscribe((res) => {
      this.icafeList = res;

      this.getFilteredIcafe(
        this.event?.value.id_provinsi,
        this.event?.value.id
      );
    });
  }

  getFilteredIcafe(idProvinsi: number, idCity: number) {
    this.filteredIcafe = this.icafeList.filter(
      (data: any) =>
        data.provinceId === Number(idProvinsi) && data.cityId === idCity
    );
  }

  showEditSidebar(data: any) {
    this.selectedIcafe = data;
    this.iCafeManagementService.visibleSidebar = true;
  }
}
