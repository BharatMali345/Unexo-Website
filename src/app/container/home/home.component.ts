import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AdminLoginAuthService } from "../admin-login/admin-login-auth.service";
import { HrService } from "../hr-login/hr.service";
import { AuthService } from "./auth.service";
import * as $ from "jquery";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, AfterViewInit {
  signUpForm: NgForm;
  loginForm: NgForm;
  signUpData: string;
  matchPassword: boolean = false;
  captchaResponseServer: string;
  candidate: string;
  verifyCaptcha = false;
  showPassword = false;
  checkBoxValue = true;
  constructor(
    public authService: AuthService,
    public adminloginservice: AdminLoginAuthService,
    public hrservice: HrService
  ) {}

  ngOnInit(): void {
    this.candidate = "candidate";
  }
  ngAfterViewInit() {
    $("#phoneNo").on("input", function () {
      var nonNumReg = /[^0-9]/g;
      $(this).val($(this).val().replace(nonNumReg, ""));
    });
    $("#pass").keypress(function (e) {
      if (e.which === 32) return false;
    });
    $("#pass1").keypress(function (e) {
      if (e.which === 32) return false;
    });
    $("#pass2").keypress(function (e) {
      if (e.which === 32) return false;
    });
  }

  togglepassword() {
    this.showPassword = !this.showPassword;
  }

  SignUpSwitch() {
    var login = document.getElementById("unexologin");
    let signup = document.getElementById("unexosignup");
    login.style.display = "block" ? "none" : "block";
    signup.style.display = "none" ? "block" : "none";
  }

  LogInSwitch() {
    var login = document.getElementById("unexologin");
    let signup = document.getElementById("unexosignup");
    login.style.display = "none" ? "block" : "none";
    signup.style.display = "block" ? "none" : "block";
    setTimeout(() => {
      document.getElementById("unexologin").scrollTo(-10, -10);
    }, 100);
    setTimeout(() => {
      document.getElementById("unexosignup").scrollTo(-10, -10);
    }, 100);
  }

  onSignUp(signUpForm) {
    let pass = signUpForm.value.password;
    let confirmPass = signUpForm.value.confirmPassword;
    if (pass === confirmPass) {
      this.signUpData = signUpForm.value;
      this.signUpData["captcha"] = this.captchaResponseServer;
      if (this.captchaResponseServer != null && this.checkBoxValue == true) {
        console.log(this.signUpData);
        this.authService.signup(this.signUpData);
        this.ngOnInit();
      } else {
        this.verifyCaptcha = true;
      }
    } else {
      this.matchPassword = true;
    }
  }

  onLogIn(loginForm) {
    this.authService.logIn(loginForm.value);
    loginForm.reset();
  }

  resolved(captchaResponse: string) {
    this.captchaResponseServer = captchaResponse;
  }

  TcSwitch() {
    let box = document.getElementById("tcbox");
    box.style.display = "flex";
  }
  TcSwitchClose() {
    let box = document.getElementById("tcbox");
    box.style.display = "none";
  }
}
