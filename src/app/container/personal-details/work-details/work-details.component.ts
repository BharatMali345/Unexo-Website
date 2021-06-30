import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { LocalService } from 'src/app/components/local.service';
import { AuthService } from '../../home/auth.service';
import { PersonalDetailsService } from '../personal-details.service';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.css']
})
export class WorkDetailsComponent implements OnInit {
  navigationSubscription: Subscription;
  myUserId: string;
  isLoading = false;
  isTrue = true;
  wdData: any;
  nodata = false;
  data: any;
  constructor(private route: ActivatedRoute, public authservice: AuthService, public personaldetailService: PersonalDetailsService, private readonly notifierService: NotifierService, private router: Router, private localservice: LocalService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.myUserId = this.authservice.userid();
    if (this.personaldetailService.editMode()) {
      this.getWorkDetailsFormData();
    }

  }


  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }


  submitWorkExperience(WorkExperience: NgForm) {
    this.isLoading = true;
    this.personaldetailService.addWorkExperience(WorkExperience.value).subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/personal-details/employer']);
      if (this.personaldetailService.editMode()) {
        this.notifierService.notify("success", "Updated Work Details Successfully");
        localStorage.setItem('UserStatus', this.localservice.encryptData(3));
      }
      else {


        localStorage.setItem('UserStatus', this.localservice.encryptData(3));


        this.notifierService.notify("success", "Added Work Details Successfully");

      }
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;

      }
    );
    // WorkExperience.reset();
  }


  onReset(WorkExperience: NgForm) {
    WorkExperience.reset();
  }


  onSkip() {
    this.router.navigate(['/personal-details/employer']);
  }

  getWorkDetailsFormData() {
    this.isLoading = true;
    this.personaldetailService.getWorkDetailsData().subscribe(response => {
      this.data = response;
      if (this.data.status == "") {
        this.nodata = true;
      }
      else {
        this.wdData = response;
      }
    },
      error => {

      });
    this.isLoading = false;

  }
}
