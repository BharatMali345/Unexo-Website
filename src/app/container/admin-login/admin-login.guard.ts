import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../home/auth.service';
import { AdminLoginAuthService } from './admin-login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate {
  constructor(private _authService: AuthService, private _admiloginservice: AdminLoginAuthService, private _router: Router) {

  }
  canActivate(): boolean {
    if (this._authService.loggedIn() && this._admiloginservice.usertype == 'admin') {
      return true;
    } else {
      this._authService.logoutUser();
      this._router.navigate(['//home']);
      return false;
    }
  }

}
