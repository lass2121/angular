import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  menuItem = [
    { label: 'Beranda', url: '' },
    { label: 'Tentang Kami', url: 'about-us' },
  ];

  products: any[] = [];

  responsiveOptions: any = [];

  isDisplaySpecification = false;

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.products = [
      {
        id: 1,
        name: 'Online booking',
        price: '',
        image: 'touch.jpg',
        description: 'Daftar - Masuk - Pesan - Main',
      },
      {
        id: 2,
        name: 'High performance PC',
        price: 5000,
        image: 'pc-gaming.png',
        description: '',
      },
      {
        id: 3,
        name: 'Up to date game data',
        price: '',
        image: 'game-list.jpg',
        description:
          'Kami mempunyai lebih dari 30 game yang siap menemani hari anda',
      },
      {
        id: 4,
        name: 'Ruangan luas dan nyaman',
        price: '',
        image: 'room.jpg',
        description: 'Buruan, tunggu apa lagi. Yuk main di mabar kuy',
      },
    ];
  }
}
