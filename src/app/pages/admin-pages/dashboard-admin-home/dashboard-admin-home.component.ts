import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin-home',
  templateUrl: './dashboard-admin-home.component.html',
  styleUrls: ['./dashboard-admin-home.component.css'],
})
export class DashboardAdminHomeComponent {
  homeAdmin = [
    {
      title: 'I-cafe manajemen',
      url: '/admin-dashboard/admin-management',
    },
    {
      title: 'Lihat Pesanan & transaksi',
      url: '/admin-dashboard/admin-list',
    },
  ];
}
