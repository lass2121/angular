import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SkeletonModule } from 'primeng/skeleton';
import { of } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SkeletonModule,
      ],
      declarations: [LoginFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.formLogin.controls['email'].setValue('');
    component.formLogin.controls['password'].setValue('');
    expect(component.formLogin.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.formLogin.controls['email'].setValue('budi@mail.com');
    component.formLogin.controls['password'].setValue('123456');
    expect(component.formLogin.valid).toBeTruthy();
  });

  it('should call on submit on success with admin role', () => {
    component.loginService.isLoadingLogin = true;
    let service = fixture.debugElement.injector.get(LoginService);
    spyOn(service, 'login').and.returnValue(
      of({
        token: 'asdasdas',
        message: 'success',
        role: 'admin',
      })
    );

    let storage = spyOn(localStorage, 'setItem');
    localStorage.setItem('access_token', 'asdfadsfs');
    const routerSpy = spyOn(router, 'navigateByUrl');

    component.login();
    fixture.detectChanges();
    expect(storage).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should call on submit on success with other role', () => {
    component.loginService.isLoadingLogin = true;
    let service = fixture.debugElement.injector.get(LoginService);
    spyOn(service, 'login').and.returnValue(
      of({
        token: 'asdasdas',
        message: 'success',
        role: 'user',
      })
    );
    let storage = spyOn(localStorage, 'setItem');
    localStorage.setItem('access_token', 'asdfadsfs');
    const routerSpy = spyOn(router, 'navigateByUrl');

    component.login();
    fixture.detectChanges();
    expect(storage).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should call on submit on not found', () => {
    component.loginService.isLoadingLogin = true;
    let service = fixture.debugElement.injector.get(LoginService);
    spyOn(service, 'login').and.returnValue(
      of({
        token: 'asdasdas',
        message: 'Not found',
        role: 'admin',
      })
    );
    component.showErrorToast.emit('email atau passwordd salah');
    component.login();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call on submit on other message', () => {
    component.loginService.isLoadingLogin = true;
    let service = fixture.debugElement.injector.get(LoginService);
    spyOn(service, 'login').and.returnValue(
      of({
        token: 'asdasdas',
        message: '',
        role: 'admin',
      })
    );
    component.showErrorToast.emit('Error');
    component.login();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
