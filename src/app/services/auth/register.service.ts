import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Register } from 'src/app/interfaces/Register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  isLoadingRegister = false;
  constructor(private http: HttpClient) {}

  register(body: Partial<Register>) {
    return this.http.post<any>(`${environment.urlApiAuth}/user/register`, body);
  }
}
