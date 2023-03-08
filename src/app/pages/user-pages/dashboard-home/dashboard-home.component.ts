import { Component, OnInit } from '@angular/core';
import { IcafeManagementService } from 'src/app/services/icafe-management/icafe-management.service';
import { UserService } from 'src/app/services/users/user.service';
import { BookingData } from '../../../interfaces/BookingData';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  activity: BookingData[] = [];
  state = [];

  homeCard = [
    {
      title: 'Mabar Kuy',
      url: '/dashboard/list',
    },
    {
      title: 'Lihat Aktivitas & Transaksi',
      url: '/dashboard/status',
    },
  ];

  constructor(
    public iCafeManagementService: IcafeManagementService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((resp) => {
      if (resp.data.id)
        this.iCafeManagementService.getOrderStatus(resp.data.id);
    });

    this.iCafeManagementService.dataOrder.subscribe((res: any) => {
      this.activity = res;
    });
  }
}
