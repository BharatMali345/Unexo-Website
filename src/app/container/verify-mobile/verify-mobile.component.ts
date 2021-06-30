import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../home/auth.service';

@Component({
  selector: 'app-verify-mobile',
  templateUrl: './verify-mobile.component.html',
  styleUrls: ['./verify-mobile.component.css']
})
export class VerifyMobileComponent implements OnInit {
  isLoading = false;
  formData: NgForm;
  phoneNo: number;
  constructor(private authservice: AuthService, private readonly notifierService: NotifierService, private router: Router) { }

  ngOnInit(): void {
    this.phoneNo = this.authservice.phoneNo;
  }
  sendOtp(form: NgForm) {
    this.isLoading = true;
    var fpass = document.getElementById("fpass");
    let otp = document.getElementById("otp");
    this.authservice.SendOtp(form.value).subscribe(resData => {
      this.phoneNo = resData.phoneNo;
      this.isLoading = false;

      this.notifierService.notify("success", " Otp Sent To Phone No");
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
    this.formData["phoneNo"] = this.phoneNo;
    this.authservice.SubmitOtp(this.formData).subscribe(resData => {
      this.isLoading = false;
      this.notifierService.notify("success", " Phone No Verified");
      this.authservice.phoneotpverify = true;
      this.authservice.routeWithStatus();
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;

      }
    );


  }


}

