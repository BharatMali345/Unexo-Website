import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn() && this._authService.usertype == 'candidate') {
      return true;
    } else {
      this._authService.logoutUser();
      this._router.navigate(['//home']);
      return false;
    }
  }

}
