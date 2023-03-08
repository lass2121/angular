import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../interfaces/Login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isDisplayModalLogin = false;
  isLoadingLogin = false;

  constructor(private http: HttpClient) {}

  login(body: Partial<Login>) {
    return this.http.post<any>(`${environment.urlApiAuth}/user/login`, body);
  }
}
