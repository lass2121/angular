import { Component } from '@angular/core';
import { IcafeManagementService } from 'src/app/services/icafe-management/icafe-management.service';
import { UserService } from 'src/app/services/users/user.service';
import { BookingData } from '../../../interfaces/BookingData';

@Component({
  selector: 'app-order-status-admin',
  templateUrl: './order-status-admin.component.html',
  styleUrls: ['./order-status-admin.component.css'],
})
export class OrderStatusAdminComponent {
  booking: BookingData[] = [];

  constructor(public iCafeManagementService: IcafeManagementService) {}

  ngOnInit(): void {
    this.getDataOrder();
  }

  getDataOrder() {
    this.iCafeManagementService.getOrderStatus('');
    this.iCafeManagementService.dataOrder.subscribe((res: any) => {
      this.booking = res;
    });
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
      status: 'Berhasil dipesan',
      icafeName: data?.icafeName,
      icafeAddress: data?.icafeAddress,
    };
    this.iCafeManagementService.updateOrderStatus(data.id, payload, 'admin');
  }

  convertToDate(data: Date) {
    return new Date(data);
  }
}
