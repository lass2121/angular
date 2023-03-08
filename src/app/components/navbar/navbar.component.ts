import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/users/user.service';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../../../src/styles.css'],
  providers: [MessageService],
})
export class NavbarComponent {
  items!: MenuItem[];
  buttonItems!: MenuItem[];
  role: User = {
    status: 0,
    data: {
      _id: '',
      name: '',
      email: '',
      role: '',
      registerAt: '',
      __v: 0,
      avatar: '',
      id: '',
    },
  };

  isDisplaySetting = false;
  checked = false;

  @Input() propItem: any[] = [];

  constructor(
    public loginService: LoginService,
    private router: Router,
    public userService: UserService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.userService.user.subscribe((resp) => {
      this.role = resp;
    });

    this.items = [];

    this.propItem.forEach((element) => {
      this.items.push({
        label: element.label,
        command: () => {
          this.navigateToUrl(element.url);
        },
      });
    });

    this.buttonItems = [
      {
        label: 'Setting',
        icon: 'pi pi-wrench',
        command: () => {
          this.isDisplaySetting = true;
        },
      },
      { separator: true },
      {
        label: 'Keluar',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logOut();
        },
      },
    ];

    if (this.items.length == 0) {
      this.userService.selectedBgColour =
        localStorage.getItem('bg-color') ?? 'white';
      this.changeBackground();
    }
  }

  navigateToUrl(element: string) {
    this.router.navigateByUrl(element);
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  showTopCenter(detail: string) {
    this.messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Error',
      detail: detail,
    });
  }

  showModalDialog() {
    this.loginService.isDisplayModalLogin = true;
  }

  changeBackground() {
    document.body.classList.remove(localStorage.getItem('bg-color')!);
    document.body.classList.toggle(this.userService.selectedBgColour);

    localStorage.setItem('bg-color', this.userService.selectedBgColour);
  }
}
