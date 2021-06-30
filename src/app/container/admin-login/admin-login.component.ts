import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminLoginAuthService } from './admin-login-auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, AfterViewInit {
  isLoading = false;
  showPassword = false;

  constructor(private adminloginauthservice: AdminLoginAuthService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    $('#pass').keypress(function (e) {
      if (e.which === 32)
        return false;
    });
  }
  togglepassword() {
    this.showPassword = !this.showPassword;
  }

  adminLogin(form: NgForm) {
    this.isLoading = true;
    this.adminloginauthservice.adminlogIn(form.value);
    this.isLoading = false;

  }
}
