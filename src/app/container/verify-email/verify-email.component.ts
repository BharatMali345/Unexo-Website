import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../home/auth.service';
import { HrService } from '../hr-login/hr.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  isLoading = false;
  formData: NgForm;
  email: string;
  constructor(private hrservice: HrService, private authservice: AuthService, private readonly notifierService: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.email = this.authservice.emailid();
  }
  sendOtp(form: NgForm) {
    this.isLoading = true;
    var fpass = document.getElementById("fpass");
    let otp = document.getElementById("otp");
    this.authservice.SendOtp(form.value).subscribe(resData => {
      this.email = resData.email;
      this.isLoading = false;

      this.notifierService.notify("success", " Otp Sent To Email Id");
      fpass.style.display = "flex" ? "none" : "flex";
      otp.style.display = "none" ? "flex" : "none";
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;

      }
    );

  }
  submitOtp(form: NgForm) {
    this.isLoading = true;
    this.formData = form.value;
    this.formData["email"] = this.email;
    this.authservice.SubmitOtp(this.formData).subscribe(resData => {
      this.isLoading = false;
      this.notifierService.notify("success", " Email Verified");
      if (this.authservice.usertype == "candidate") {
        this.authservice.otpverify = true;
        this.authservice.routeWithStatus();
      }
      else {
        this.hrservice.otpverify = true;
        this.hrservice.routeWithStatus();
      }

    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;

      }
    );


  }


}
