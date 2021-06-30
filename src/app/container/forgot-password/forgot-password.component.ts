import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../home/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isLoading = false;
  formData: NgForm;
  email: string;
  constructor(private authservice: AuthService, private readonly notifierService: NotifierService, private router: Router) { }

  ngOnInit(): void {
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
    var reset = document.getElementById("reset");
    let otp = document.getElementById("otp");
    this.formData = form.value;
    this.formData["email"] = this.email;
    this.authservice.SubmitOtp(this.formData).subscribe(resData => {
      this.isLoading = false;

      this.notifierService.notify("success", " Otp Verified");
      otp.style.display = "flex" ? "none" : "flex";
      reset.style.display = "none" ? "flex" : "none";
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;

      }
    );


  }
  submitPassword(form: NgForm) {
    this.isLoading = true;

    this.formData = form.value;
    this.formData["email"] = this.email;
    this.authservice.SubmitPass(this.formData).subscribe(resData => {
      this.isLoading = false;

      this.notifierService.notify("success", " Password changed successfully!");

      this.router.navigate(['/home']);
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;

      }
    );
  }
}
