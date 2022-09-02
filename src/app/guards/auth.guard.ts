import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let obs = new Observable<boolean>((observer) => {
      this.userService.session().subscribe({
        next: (data) => {
          if (data) {
            observer.next(true);
            observer.complete();
          } else {
            this.router.navigate(['/tabs/tab2']);
            observer.next(false);
            observer.complete();
          }
        },
        error: (err) => {
          this.router.navigate(['/tabs/tab2']);
          observer.next(false);
          observer.complete();
        },
      });
    });

    return obs;
  }
}
