import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt/encrypt-decrypt.service';
import { IcafeManagementService } from 'src/app/services/icafe-management/icafe-management.service';
import { Province, City } from '../../../interfaces/BookingData';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
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

  icafeList: any = [];
  filteredIcafe: any = [];

  constructor(
    private router: Router,
    private crypto: EncryptDecryptService,
    private iCafeManagementService: IcafeManagementService
  ) {}

  ngOnInit() {
    this.getIcafeLocation();

    this.iCafeManagementService.dataIcafe.subscribe((res) => {
      this.icafeList = res;
    });

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
    this.filteredIcafe = this.icafeList.filter(
      (data: any) =>
        data.provinceId === Number(event.value.id_provinsi) &&
        data.cityId === event.value.id
    );
  }

  navigateDetailList(data: any) {
    const encoded = this.crypto.encryptPayload(JSON.stringify(data));
    this.router.navigate(['/dashboard/list/detail'], {
      queryParams: { data: encoded },
    });
  }

  getIcafeLocation() {
    this.iCafeManagementService.getIcafeLocation();
  }
}
