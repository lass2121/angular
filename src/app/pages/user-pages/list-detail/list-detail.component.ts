import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt/encrypt-decrypt.service';
import { IcafeManagementService } from 'src/app/services/icafe-management/icafe-management.service';
import { UserService } from 'src/app/services/users/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css'],
  providers: [MessageService],
})
export class ListDetailComponent {
  resultParam = '';
  date = '';
  minimumDate: Date = new Date();
  listPc: any = [];
  role: any = {};
  totalAmount = 0;

  icafe = { id: '', name: '', description: '', totalPc: 0 };
  icafeList: any[] = [];

  stateOptions: any[] = [];
  availablePc: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private crypto: EncryptDecryptService,
    public iCafeManagementService: IcafeManagementService,
    public userService: UserService,
    public messageService: MessageService
  ) {}

  formBookingDetail = new FormGroup({
    date: new FormControl('', [Validators.required]),
    numberPc: new FormControl({ icon: '', justify: '', id: '' }),
    duration: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {
    this.iCafeManagementService.isOrderSucceed = false;

    this.userService.selectedBgColour = localStorage.getItem('bg-color')!;

    this.userService.user.subscribe((resp) => {
      this.role = resp;
    });

    this.activatedRoute.queryParams.subscribe((params: any) => {
      const decoded = this.crypto.decryptPayload(params.data);
      this.resultParam = JSON.parse(decoded);
    });

    this.getSingleIcafeLocation();
    this.calculateTotal();
  }

  getSingleIcafeLocation() {
    this.iCafeManagementService.getSingleIcafeLocation(this.resultParam);

    this.getTotalPc();
  }

  getTotalPc() {
    this.iCafeManagementService.icafe.subscribe((res) => {
      this.icafe = res;

      this.availablePc = [];

      for (let i = 0; i < this.icafe.totalPc; ) {
        i++;
        this.availablePc.push({
          icon: 'pi pi-desktop',
          justify: 'Center',
          id: i,
        });
      }

      if (this.icafeList.length) {
        let pcNumber: any = [];
        this.icafeList.forEach((data) => pcNumber.push(data.pcNumber));

        this.availablePc = this.availablePc.filter(
          (data) => !pcNumber.includes(data.id)
        );
      }
    });
  }

  submitFormBooking() {
    const payload = {
      createdAt: Date.now(),
      name: this.role.data.name,
      userId: this.role.data.id,
      locationId: this.icafe.id,
      pcNumber: this.formBookingDetail.value.numberPc?.id,
      dateBooking: this.formBookingDetail.value.date,
      duration: this.formBookingDetail.value.duration,
      totalAmount: this.totalAmount,
      status: 'Menunggu pembayaran',
      icafeName: this.icafe.name,
      icafeAddress: this.icafe.description,
    };

    this.iCafeManagementService.createNewOrder(payload);
  }

  calculateTotal() {
    if (this.formBookingDetail.value.duration)
      this.totalAmount = this.formBookingDetail.value.duration! * 5000;
    else this.totalAmount = 0;
  }

  checkValidation(formParam: string) {
    return this.formBookingDetail.get(formParam);
  }

  showTopCenter(detail: string) {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Order berhasil dibuat',
      detail: detail,
    });
  }

  checkAvailablePc() {
    this.iCafeManagementService.getOrderStatus('');
    this.iCafeManagementService.dataOrder.subscribe((res: any) => {
      this.icafeList = res.filter(
        (data: any) =>
          data.locationId === this.resultParam &&
          new Date(this.formBookingDetail.value.date!) >=
            new Date(data.dateBooking) &&
          new Date(this.formBookingDetail.value.date!) <=
            this.getHours(data.dateBooking, data.duration)
      );

      this.formBookingDetail.patchValue({
        numberPc: { icon: '', justify: '', id: '' },
      });

      this.getTotalPc();
    });
  }

  getHours(dateBooking: string, duration: number | string) {
    let newDate = new Date(dateBooking);
    newDate.setHours(newDate.getHours() + Number(duration));
    return newDate;
  }

  checkEmptyObjectKey(data: object) {
    const isEmpty = Object.values(data).every((x) => x === null || x === '');
    return isEmpty;
  }
}
