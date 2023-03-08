import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register.service';
import { LoginService } from '../../services/auth/login.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService],
})
export class SignupComponent {
  displayRegisterDialog = false;

  constructor(
    public registerService: RegisterService,
    public loginService: LoginService,
    private router: Router,
    public messageService: MessageService
  ) {}

  formRegister = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    role: new FormControl('user', [Validators.required]),
  });

  navigateLogin() {
    this.displayRegisterDialog = false;
    this.router.navigateByUrl('');
    this.loginService.isDisplayModalLogin = true;
  }

  showTopCenter(detail: string) {
    this.messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Error',
      detail: detail,
    });
  }

  register() {
    this.registerService.isLoadingRegister = true;
    this.registerService.register(this.formRegister.value).subscribe((resp) => {
      if (resp.message === 'User already registered')
        this.showTopCenter('Maaf, user sudah ada');
      else this.displayRegisterDialog = true;

      this.registerService.isLoadingRegister = false;
    });
  }

  checkValidation(formParam: string) {
    return this.formRegister.get(formParam);
  }
}
