import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { SignupComponent } from './signup.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterService } from 'src/app/services/auth/register.service';
import { ButtonModule } from 'primeng/button';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CardModule,
        DialogModule,
        ToastModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ButtonModule,
      ],
      declarations: [SignupComponent, DashboardCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigateLogin', () => {
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.navigateLogin();
    const navigateLogin = spyOn(component, 'navigateLogin');

    fixture.detectChanges();

    expect(routerSpy).toHaveBeenCalled();
    expect(navigateLogin).toHaveBeenCalled;

    expect(component.displayRegisterDialog).toBeFalsy;
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

  it('should call register function with user already registered', () => {
    component.registerService.isLoadingRegister = true;
    let service = fixture.debugElement.injector.get(RegisterService);
    spyOn(service, 'register').and.returnValue(
      of({
        token: 'asdasdas',
        message: 'User already registered',
        role: 'user',
      })
    );
    const showTopCenter = spyOn(component, 'showTopCenter');

    component.register();
    component.showTopCenter('');
    fixture.detectChanges();

    expect(showTopCenter).toHaveBeenCalled();
  });

  it('should call register function with new user', () => {
    component.registerService.isLoadingRegister = true;
    let service = fixture.debugElement.injector.get(RegisterService);
    spyOn(service, 'register').and.returnValue(
      of({
        token: 'asdasdas',
        message: 'Success',
        role: 'user',
      })
    );

    component.register();

    fixture.detectChanges();

    expect(component.displayRegisterDialog).toBeTruthy();
  });
});
