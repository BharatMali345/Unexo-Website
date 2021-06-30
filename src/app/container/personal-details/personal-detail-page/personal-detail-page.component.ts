import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { LocalService } from 'src/app/components/local.service';
import { AuthService } from '../../home/auth.service';
import { PersonalDetailsService } from '../personal-details.service';


@Component({
  selector: 'app-personal-detail-page',
  templateUrl: './personal-detail-page.component.html',
  styleUrls: ['./personal-detail-page.component.css']
})
export class PersonalDetailPageComponent implements OnInit, AfterViewInit {
  isLoading = false;
  personalDetailsForm: NgForm;
  navigationSubscription: Subscription;
  formData: FormData = new FormData();
  myUserId: string;
  isTrue = true;
  pdData: any;
  phoneNo: number;
  emailid: string;
  myage: number;
  myage1: number;
  districts: [];
  value: string;
  limitexcedded = true;
  maximumDate: string;

  constructor(private localservice: LocalService, public authservice: AuthService, public personaldetailService: PersonalDetailsService, private readonly notifierService: NotifierService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.myUserId = this.authservice.userid();
        this.personaldetailService.getUserPhoneNo().subscribe(res => {

          this.phoneNo = res.phoneNo;
          this.emailid = res.email;
        });
        if (this.personaldetailService.editMode()) {
          this.getPersonalDetailsFormData();
          var dtToday = new Date();
          var month = dtToday.getMonth().toString();
          var day = dtToday.getDate().toString();
          var year = dtToday.getFullYear() - 16;
          if (+month < 10) {
            month = ('0' + month.toString());
          }
          if (+day < 10) {
            day = ('0' + day.toString());
          }
          this.maximumDate = year + '-' + month + '-' + day;
        }
      }
    });
  }

  ngOnInit() {
    // this.myUserId = this.authservice.userid();
    // this.personaldetailService.getUserPhoneNo().subscribe(res => {
    //   this.phoneNo = res.phoneNo;
    //   this.emailid = res.email;
    // });
    // if (this.personaldetailService.editMode()) {
    //   this.getPersonalDetailsFormData();
    // }
  }


  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }


  ngAfterViewInit() {


    $("#mobileNo").on("input", function () {
      var nonNumReg = /[^0-9]/g
      $(this).val($(this).val().replace(nonNumReg, ''));
    });

    $(function () {
      var dtToday = new Date();
      var month = dtToday.getMonth().toString();
      var day = dtToday.getDate().toString();
      var year = dtToday.getFullYear() - 16;
      if (+month < 10) {
        month = ('0' + month.toString());
      }
      if (+day < 10) {
        day = ('0' + day.toString());
      }
      var maxDate = year + '-' + month + '-' + day;
      $('#dob').attr('max', maxDate);

    });



    // $(function () {
    //   var dtToday = new Date();
    //   var month = dtToday.getMonth().toString();
    //   var day = dtToday.getDate().toString();
    //   var year = dtToday.getFullYear() - 16;
    //   if (+month < 10) {
    //     month = ('0' + month.toString());
    //   }
    //   if (+day < 10) {
    //     day = ('0' + day.toString());
    //   }
    //   var maxDate = year + '-' + month + '-' + day;
    //   console.log(maxDate)
    // });





    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#output').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
      }
    }


    $("#file").change(function () {
      readURL(this);
    });





  }


  calculateAge() {
    var date = new Date($('#dob').val());
    var now = new Date();
    const diff = Math.abs(+(now) - +(date));
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    this.myage = age;
  }
  calculateAge1() {
    var date = new Date($('#dob1').val());
    var now = new Date();
    const diff = Math.abs(+(now) - +(date));
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    this.myage1 = age;
  }

  setFiles(event) {
    let files = event.srcElement.files
    const file = event.target.files[0];
    if (file.size > 4194304) {
      this.limitexcedded = true;
      alert("File Size exceeds More than 4Mb");
    }
    else {
      if (!files) {
        return
      }
      for (var i = 0; i < files.length; i++) {
        this.formData.append(i.toString(), files[i], files[i].name);
      }
      this.limitexcedded = false;
      alert("File Uploaded");
    }

  }


  submitPersonalDetails(personalDetailsForm) {
    this.isLoading = true;
    this.formData.append("data", JSON.stringify(personalDetailsForm.value));


    this.personaldetailService.addPsData(this.formData).subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/personal-details/education']);
      if (this.personaldetailService.editMode()) {
        this.notifierService.notify("success", " Updated Successfully");
      }
      else {
        localStorage.setItem('UserStatus', this.localservice.encryptData(+this.authservice.userStatus() + 1));
        this.notifierService.notify("success", " Inserted Successfully");
      }
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');

      }
    );
    // this.onReset(personalDetailsForm.value);


  }


  onReset(personalDetailsForm) {
    personalDetailsForm.reset();
    this.ngOnInit();
  }


  getPersonalDetailsFormData() {
    this.isLoading = true;
    this.personaldetailService.getPersonalDetailsData().subscribe(response => {
      this.pdData = response;
      this.myage1 = this.pdData[0].age;
      this.value = this.pdData[0].stateCode.toString();
      if (this.personaldetailService.editMode()) {
        this.personaldetailService.getDistricts(this.value).subscribe(response => {
          this.districts = response;
        },
          error => {
          });
      }
    },
      error => {

      });
    this.isLoading = false;
  }

  onChangeStateCode(value: string) {
    this.personaldetailService.getDistricts(value).subscribe(response => {
      this.districts = response;
    },
      error => {
      });
  }
}
