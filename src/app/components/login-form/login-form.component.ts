import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(public loginService: LoginService, public router: Router) {}

  @Output() showErrorToast = new EventEmitter<string>();

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.loginService.isLoadingLogin = true;
    this.loginService.login(this.formLogin.value).subscribe((resp) => {
      if (resp.message === 'success') {
        localStorage.setItem('access_token', resp.token);
        localStorage.setItem('role', resp.role);

        this.loginService.isDisplayModalLogin = false;

        if (resp.role === 'admin')
          this.router.navigateByUrl('admin-dashboard/home');
        else this.router.navigateByUrl('dashboard/home');
      } else if (resp.message === 'Not found') {
        this.showErrorToast.emit('Email atau password salah');
      } else {
        this.showErrorToast.emit('Error');
      }
      this.loginService.isLoadingLogin = false;
    });
  }

  checkValidation(formParam: string) {
    return this.formLogin.get(formParam);
  }
}
