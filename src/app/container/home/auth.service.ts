import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { Subject } from "rxjs";
import { LocalService } from "src/app/components/local.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  username: string;
  usertype: string;
  myReferralCode: string;
  referralPoints: string;
  isLoading = false;
  email: string;
  otpverify: boolean;
  phoneotpverify: boolean;
  phoneNo: number;
  status: number;

  constructor(
    private localService: LocalService,
    private http: HttpClient,
    private router: Router,
    private readonly notifierService: NotifierService
  ) {}

  signup(user) {
    this.isLoading = true;
    return this.http
      .post<User>(environment.baseUrl + "/signup/", user)
      .subscribe(
        (resData) => {
          localStorage.setItem(
            "UserId",
            this.localService.encryptData(resData.userId)
          );
          localStorage.setItem(
            "UserStatus",
            this.localService.encryptData(resData.status)
          );
          localStorage.setItem(
            "tn",
            this.localService.encryptData(resData.token)
          );
          localStorage.setItem(
            "email",
            this.localService.encryptData(resData.email)
          );
          this.phoneNo = +resData.phoneNo;
          this.otpverify = resData.otpVerify;
          this.status = +resData.status;
          this.phoneotpverify = resData.phoneOtpVerify;
          this.username = resData.firstName;
          this.usertype = resData.userType;
          this.myReferralCode = resData.myReferralCode;
          this.referralPoints = resData.referralPoints;
          this.routeWithStatus();
          this.notifierService.notify(
            "success",
            resData.firstName + " Logged In"
          );
          this.isLoading = false;
        },
        (errorMessage) => {
          this.notifierService.notify("error", errorMessage.error.status);
          this.isLoading = false;
        }
      );
  }

  logIn(user) {
    this.isLoading = true;
    return this.http
      .post<User>(environment.baseUrl + "/login/", user)
      .subscribe(
        (resData) => {
          this.usertype = resData.userType;
          if (this.usertype == "admin") {
            this.notifierService.notify("error", "Invalid Credentials given.");
            this.isLoading = false;
          } else if (this.usertype == "hr") {
            this.notifierService.notify("error", "Invalid Credentials given.");
            this.isLoading = false;
          } else {
            localStorage.setItem(
              "UserId",
              this.localService.encryptData(resData.userId)
            );
            localStorage.setItem(
              "UserStatus",
              this.localService.encryptData(resData.status)
            );
            localStorage.setItem(
              "tn",
              this.localService.encryptData(resData.token)
            );
            localStorage.setItem(
              "email",
              this.localService.encryptData(resData.email)
            );
            this.phoneNo = +resData.phoneNo;
            this.status = +resData.status;
            this.otpverify = resData.otpVerify;
            this.phoneotpverify = resData.phoneOtpVerify;
            this.username = resData.firstName;
            this.myReferralCode = resData.myReferralCode;
            this.referralPoints = resData.referralPoints;
            this.routeWithStatus();
            this.notifierService.notify(
              "success",
              resData.firstName + " Logged In"
            );
            this.isLoading = false;
          }
        },
        (errorMessage) => {
          this.notifierService.notify("error", errorMessage.error.status);
          this.isLoading = false;
        }
      );
  }

  SendOtp(user) {
    return this.http.post<any>(environment.baseUrl + "/sendotp/", user);
  }

  SubmitOtp(user) {
    return this.http.post<any>(environment.baseUrl + "/submitotp/", user);
  }

  SubmitPass(user) {
    return this.http.post<any>(environment.baseUrl + "/submitpassword/", user);
  }

  routeWithStatus() {
    if (this.otpverify == null) {
      this.router.navigate(["/verify-email"]);
    }
    // else if (this.phoneotpverify == null) {
    //   this.router.navigate(["/verify-mobile"]);
    // }
    else {
      if (+this.userStatus() === 0) {
        this.router.navigate(["/personal-details"]);
      } else if (+this.userStatus() === 1) {
        this.router.navigate(["/personal-details/education"]);
      } else if (+this.userStatus() === 2) {
        this.router.navigate(["/personal-details/work"]);
      } else if (+this.userStatus() === 3) {
        this.router.navigate(["/personal-details/employer"]);
      } else {
        this.router.navigate(["/user-profile"]);
      }
      // else if (+this.userStatus() === 4) {
      //   this.router.navigate(['/personal-details/family']);
      // }
      // else if (+this.userStatus() === 5) {
      //   this.router.navigate(['/personal-details/bank']);
      // }
      // else if (+this.userStatus() === 6) {
      //   this.router.navigate(['/personal-details/documents']);
      // }
      // else {
      //   this.router.navigate(['/user-profile']);
      // }
    }
  }

  logoutUser() {
    this.isLoading = true;
    localStorage.removeItem("UserId");
    localStorage.removeItem("UserStatus");
    localStorage.removeItem("editMode");
    localStorage.removeItem("tn");
    localStorage.removeItem("email");
    this.notifierService.notify("error", "Logged out!");
    this.router.navigate(["/home"]);
    this.isLoading = false;
    window.location.assign("home");
  }

  getToken() {
    return this.localService.decryptData(localStorage.getItem("tn"));
  }

  verified() {
    return !!localStorage.getItem("otpVerify");
  }

  userStatus() {
    return this.localService.decryptData(localStorage.getItem("UserStatus"));
  }

  userid() {
    return this.localService.decryptData(localStorage.getItem("UserId"));
  }
  emailid() {
    return this.localService.decryptData(localStorage.getItem("email"));
  }

  loggedIn() {
    return !!localStorage.getItem("tn");
  }
}
