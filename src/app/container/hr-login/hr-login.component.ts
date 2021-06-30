import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HrService } from './hr.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-hr-login',
  templateUrl: './hr-login.component.html',
  styleUrls: ['./hr-login.component.css']
})
export class HrLoginComponent implements OnInit, AfterViewInit {
  isLoading = false;
  hr: string;
  captchaResponseServer: string;
  signUpData: string;
  matchPassword: boolean = false;
  verifyCaptcha = false;
  showPassword1 = false;
  showPassword2 = false;
  checkBoxValue=true;


  constructor(private hrService: HrService) { }

  ngOnInit(): void {
    this.hr = "hr";
  }
  ngAfterViewInit() {
    $("#phoneNo").on("input", function () {
      var nonNumReg = /[^0-9]/g
      $(this).val($(this).val().replace(nonNumReg, ''));
    });

    $('#pass').keypress(function (e) {
      if (e.which === 32)
        return false;
    });

    $('#pass1').keypress(function (e) {
      if (e.which === 32)
        return false;
    }); $('#pass2').keypress(function (e) {
      if (e.which === 32)
        return false;
    });

  }
  togglepassword1() {
    this.showPassword1 = !this.showPassword1;
  }
  togglepassword2() {
    this.showPassword2 = !this.showPassword2;
  }

  SignUpSwitch() {
    var login = document.getElementById("login");
    let signup = document.getElementById("signup");
    login.style.display = "block" ? "none" : "block";
    signup.style.display = "none" ? "block" : "none";
  }


  LogInSwitch() {
    var login = document.getElementById("login");
    let signup = document.getElementById("signup");
    login.style.display = "none" ? "block" : "none";
    signup.style.display = "block" ? "none" : "block";
  }

  hrLogin(form: NgForm) {
    this.hrService.hrlogIn(form.value);
    form.reset();
  }


  hrSignup(form: NgForm) {
    let pass = form.value.password;
    let confirmPass = form.value.confirmPassword;
    if (pass === confirmPass) {
      this.signUpData = form.value;
      this.signUpData["captcha"] = this.captchaResponseServer;
      if (this.captchaResponseServer != null && this.checkBoxValue==true) {
        this.hrService.hrsignup(this.signUpData);
        this.ngOnInit();
      }
      else {
        this.verifyCaptcha = true;
      }
    }
    else {
      this.matchPassword = true;
    }
  }

  resolved(captchaResponse: string) {
    this.captchaResponseServer = captchaResponse;
  }

  TcSwitch() {
    let box = document.getElementById("tcbox1");
      box.style.display = "flex";
  }
  TcSwitchClose() {
    let box = document.getElementById("tcbox1");
      box.style.display = "none";
  }
}
