import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Subject<User> = new BehaviorSubject<User>({
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
  });

  selectedBgColour = '';

  getToken = '';
  header = {};

  constructor(private http: HttpClient) {}

  getUser() {
    this.getToken = localStorage.getItem('access_token') ?? '';
    this.header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.getToken}`
      ),
    };

    if (this.getToken)
      this.http
        .get<User>(`${environment.urlApiAuth}/user/profile`, this.header)
        .subscribe({
          next: (resp) => {
            this.user.next(resp);
          },
          error: (err) => {
            console.log(err, '<< err');
          },
        });
  }
}
