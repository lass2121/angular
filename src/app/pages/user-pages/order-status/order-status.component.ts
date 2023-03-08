import { Component, OnInit } from '@angular/core';
import { IcafeManagementService } from 'src/app/services/icafe-management/icafe-management.service';
import { UserService } from 'src/app/services/users/user.service';
import { BookingData } from '../../../interfaces/BookingData';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css'],
})
export class OrderStatusComponent implements OnInit {
  booking: BookingData[] = [];

  constructor(
    public iCafeManagementService: IcafeManagementService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getDataOrder();
  }

  updateOrderStatus(data: any) {
    const payload = {
      createdAt: data?.createdAt,
      name: data?.name,
      userId: data?.userId,
      locationId: data?.locationId,
      pcNumber: data?.pcNumber,
      dateBooking: data?.dateBooking,
      duration: data?.duration,
      totalAmount: data?.totalAmount,
      status: 'Menunggu konfirmasi',
      icafeName: data?.icafeName,
      icafeAddress: data?.icafeAddress,
    };
    this.iCafeManagementService.updateOrderStatus(data.id, payload, 'user');
  }

  convertToDate(data: Date) {
    return new Date(data);
  }

  getDataOrder() {
    this.userService.user.subscribe((resp) => {
      if (resp.data.id)
        this.iCafeManagementService.getOrderStatus(resp.data.id);
    });

    this.iCafeManagementService.dataOrder.subscribe((res: BookingData[]) => {
      this.booking = res;
    });
  }
}
