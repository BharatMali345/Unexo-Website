import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { LocalService } from "src/app/components/local.service";
import { environment } from "src/environments/environment";
import { AuthService } from "../home/auth.service";
import { User } from "../home/user.model";

@Injectable({
  providedIn: "root",
})
export class HrService {
  username: string;
  usertype: string;
  myReferralCode: string;
  referralPoints: string;
  isLoading = false;
  email: string;
  otpverify: boolean;
  phoneotpverify: boolean;
  phoneNo: number;

  constructor(
    private localService: LocalService,
    private authservice: AuthService,
    private http: HttpClient,
    private router: Router,
    private readonly notifierService: NotifierService
  ) {}

  hrlogIn(user) {
    this.isLoading = true;
    return this.http
      .post<User>(environment.baseUrl + "/login/", user)
      .subscribe(
        (resData) => {
          this.usertype = resData.userType;
          if (this.usertype == "candidate") {
            this.notifierService.notify("error", " Invalid Credentials given.");
            this.isLoading = false;
          } else if (this.usertype == "admin") {
            this.notifierService.notify("error", " Invalid Credentials given.");
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

  hrsignup(user) {
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
          this.phoneotpverify = resData.phoneOtpVerify;
          this.username = resData.firstName;
          this.usertype = resData.userType;
          this.myReferralCode = resData.myReferralCode;
          this.referralPoints = resData.referralPoints;
          this.router.navigate(["/verify-email"]);
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

  routeWithStatus() {
    if (this.otpverify == null) {
      this.router.navigate(["/verify-email"]);
    } else if (this.phoneotpverify == null) {
      this.router.navigate(["/verify-mobile"]);
    } else {
      this.router.navigate(["/hr-profile"]);
    }
  }
}
