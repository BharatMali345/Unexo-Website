import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { EmployerData } from '../../user-profile/profile-employer-detail/employer.model';
import { HrProfileService } from '../hr-profile.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-employer-details',
  templateUrl: './employer-details.component.html',
  styleUrls: ['./employer-details.component.css']
})
export class EmployerDetailsComponent implements OnInit {

  isLoading = false;
  data: EmployerData;
  ac: any;
  nodata = false;
  userId: number;
  jobid: any;
  private sub: any;


  navigationSubscription: Subscription;

  constructor(private hrprofielservice: HrProfileService, private router: Router, private notifierService: NotifierService, private route: ActivatedRoute, private _location: Location) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.sub = this.route.params.subscribe(params => {
          this.userId = +params['userId'];
          this.jobid = +params['jobid'];
        });
        this.getEmployerDetail(this.userId);

      }
    });
  }

  ngOnInit(): void {
  }

  getEmployerDetail(userid) {
    this.isLoading = true;
    this.hrprofielservice.getEmployerDetailsData(userid).subscribe((response: EmployerData) => {
      this.data = response;
      if (this.data.status == '') {
        this.nodata = true;
      }
    }, error => {
    });
    this.isLoading = false;

  }
  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
    this.sub.unsubscribe();
  }



  routeBack() {
    this._location.back();
  }


  approvalstatus(status) {
    this.hrprofielservice.jobApprovalStatus(this.jobid, this.userId, status).subscribe((response: any) => {
      if (status == 1) {
        this.notifierService.notify('success', "Profile Approved!"
        );
      }
      else {
        this.notifierService.notify('success', "Profile declined!"
        );
      }

    },
      error => {
      });
  }
}
