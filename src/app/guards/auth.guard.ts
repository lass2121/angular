import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/users/user.service';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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

  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentPath = state.url;
    const getToken = localStorage.getItem('access_token') ?? '';
    const getRole = localStorage.getItem('role') ?? '';

    if (
      (currentPath === '/home' ||
        currentPath.includes('signup') ||
        currentPath.includes('about-us') ||
        currentPath === '/') &&
      getToken?.length > 0
    ) {
      if (getRole === 'admin') {
        this.router.navigate(['/admin-dashboard/home']);
      } else {
        this.router.navigate(['/dashboard/home']);
      }
    }

    if (
      currentPath !== '/home' &&
      currentPath !== '/' &&
      !currentPath.includes('signup') &&
      !currentPath.includes('about-us') &&
      getToken?.length === 0
    ) {
      this.router.navigate(['']);
    }

    if (
      currentPath.includes('admin') &&
      getToken?.length > 0 &&
      getRole === 'member'
    ) {
      this.router.navigate(['/dashboard/home']);
    } else if (
      !currentPath.includes('admin') &&
      getToken?.length > 0 &&
      getRole === 'admin'
    ) {
      this.router.navigate(['/admin-dashboard/home']);
    }

    return true;
  }
}
