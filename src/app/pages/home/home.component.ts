import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  menuItem = [
    { label: 'Beranda', url: '' },
    { label: 'Tentang Kami', url: 'about-us' },
  ];
}
