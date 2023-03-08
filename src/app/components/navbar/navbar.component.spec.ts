import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarComponent } from './navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MenubarModule,
        ToastModule,
        DialogModule,
        RadioButtonModule,
        FormsModule,
        SplitButtonModule,
        BrowserAnimationsModule,
      ],
      declarations: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigateToURL function', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.navigateToUrl('');
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should call logOut function', () => {
    let storage = spyOn(localStorage, 'clear');
    let routerSpy = spyOn(router, 'navigateByUrl');
    localStorage.clear();

    component.logOut();
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalled();
    expect(storage).toHaveBeenCalled();
  });

  it('should call showModalDialog function', () => {
    spyOn(component, 'showModalDialog');
    component.showModalDialog();
    fixture.detectChanges();
    expect(component.loginService.isDisplayModalLogin).toBeTruthy;
  });

  it('should call showTopCenter function', () => {
    component.messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Error',
      detail: 'sds',
    });

    component.showTopCenter('');
    fixture.detectChanges();
    expect(Object.keys(component.messageService).length).toBe(4);
  });

  it('should call ngInit', () => {
    let storage = spyOn(localStorage, 'getItem');
    localStorage.getItem('bg-color');

    component.ngOnInit();
    fixture.detectChanges();

    expect(storage).toHaveBeenCalled();
  });
});
