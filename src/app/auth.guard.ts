import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('Bieżąca trasa:', next.routeConfig?.path);
    console.log('Całe drzewo tras:', state.url);

    switch (next.routeConfig?.path) {
      case 'login':
      case 'register':
        if (this.authService.isLoggedIn()) this.router.navigate(['/home']);
        return true;
      case 'home':
        if (this.authService.isLoggedIn()) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
    }

    return true;
  }
}
