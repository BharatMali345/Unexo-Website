import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { AuthService } from '../../home/auth.service';
import { PersonalDetailsService } from '../../personal-details/personal-details.service';
import * as $ from 'jquery';
import { HrProfileService } from '../hr-profile.service';


@Component({
  selector: 'app-hr-home',
  templateUrl: './hr-home.component.html',
  styleUrls: ['./hr-home.component.css']
})
export class HrHomeComponent implements OnInit, AfterViewInit {
  hrDetailForm: NgForm;
  myUserId: string;
  isLoading = false;
  personalDetailsForm: NgForm;
  navigationSubscription: Subscription;
  formData: FormData = new FormData();
  isTrue = true;
  pdData: any;
  phoneNo: number;
  emailid: string;
  myage: number;
  districts: [];
  value: string;
  limitexcedded = true;
  maximumDate: string;

  constructor(private hrprofileService: HrProfileService, public authservice: AuthService, public personaldetailService: PersonalDetailsService, private readonly notifierService: NotifierService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.myUserId = this.authservice.userid();
        this.personaldetailService.getUserPhoneNo().subscribe(res => {

          this.phoneNo = res.phoneNo;
          this.emailid = res.email;
        });
        if (this.personaldetailService.editMode()) {
          this.getHrdetailsForData();
        }
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
    });
  }

  ngOnInit() {
    // this.myUserId = this.authservice.userid();
    // this.personaldetailService.getUserPhoneNo().subscribe(res => {
    //   this.phoneNo = res.phoneNo;
    //   this.emailid = res.email;
    // });
    // if (this.personaldetailService.editMode()) {
    //   this.getHrdetailsForData();
    // }
  }

  ngAfterViewInit() {
    // $(document).ready(function () {
    //   $("#dob").datepicker({
    //     changeYear: true,
    //     changeMonth: true,
    //     changeDate: true,
    //     maxDate: '-16Y',
    //   });
    // });

    $(function () {
      var dtToday = new Date();
      var month = dtToday.getMonth();
      var day = dtToday.getDate();
      var year = dtToday.getFullYear() - 18;
      if (month < 10)
        month = +('0' + month.toString());
      if (day < 10)
        day = +('0' + day.toString());
      var maxDate = year + '-' + month + '-' + day;
      $('#dobhr').attr('max', maxDate);
    });


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
    var date = new Date($('#dobhr').val());
    var now = new Date();
    const diff = Math.abs(+(now) - +(date));
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    this.myage = age;
  }
  calculateAge1() {
    var date = new Date($('#dobhr1').val());
    var now = new Date();
    const diff = Math.abs(+(now) - +(date));
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    this.myage = age;
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
  onSubmit(hrDetailForm) {

    this.isLoading = true;
    this.formData.append("data", JSON.stringify(hrDetailForm.value));

    this.hrprofileService.addHrData(this.formData).subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/hr-profile']);
      if (this.personaldetailService.editMode()) {
        this.notifierService.notify("success", " Updated Successfully");
        localStorage.removeItem('editMode');
      }
      else {
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

  }
  onChangeStateCode(value: string) {
    this.personaldetailService.getDistricts(value).subscribe(response => {
      this.districts = response;
    },
      error => {
      });
  }

  getHrdetailsForData() {
    this.isLoading = true;
    this.hrprofileService.getHrDetailsData().subscribe(response => {
      this.pdData = response;
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
}
