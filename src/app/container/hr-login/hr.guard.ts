import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../home/auth.service';
import { HrService } from './hr.service';

@Injectable({
  providedIn: 'root'
})
export class HrGuard implements CanActivate {
  constructor(private _authService: AuthService, private hrservice: HrService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn() && this.hrservice.usertype == 'hr') {
      return true;
    } else {
      this._authService.logoutUser();
      this._router.navigate(['//home']);
      return false;
    }
  }

}
