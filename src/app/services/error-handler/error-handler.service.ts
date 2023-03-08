import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private router: Router) {}
  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      alert(error.message);
      localStorage.clear();
      this.router.navigateByUrl('');
    }
  }
}
