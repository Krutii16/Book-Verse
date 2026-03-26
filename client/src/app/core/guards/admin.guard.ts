import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
     console.log("Auth:", this.authService.isAuthenticated());
    console.log("Admin:", this.authService.isAdmin());
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
