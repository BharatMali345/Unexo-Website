import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { HrProfileService } from '../hr-profile.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-applied-users',
  templateUrl: './applied-users.component.html',
  styleUrls: ['./applied-users.component.css']
})
export class AppliedUsersComponent implements OnInit {
  isLoading = false;
  private sub: any;
  public jobid: number;
  jobname: string;

  navigationSubscription: Subscription;
  userdata: any;
  pageEvent: PageEvent;
  public dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public currentPageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private hrprofileService: HrProfileService, private router: Router, private notifierService: NotifierService, private route: ActivatedRoute, private _location: Location) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.sub = this.route.params.subscribe(params => {
          this.jobid = +params['jobId'];
          this.jobname = params['jobName'];

        });
        this.getAppliedUsersOfJob(this.jobid, null, false);
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
    this.sub.unsubscribe();
  }

  getAppliedUsersOfJob(jobid, event?: PageEvent, scrollWatcher?: boolean) {
    this.isLoading = true;

    this.hrprofileService.getAppliedUsers(jobid, event).subscribe((response: any) => {
      this.userdata = response.data;
      this.currentPage = response.pageIndex;
      this.pageSize = response.pageSize;
      this.totalSize = response.totalSize;
      if (scrollWatcher == false) {
        document.body.scrollTop = 0;
      }
      this.currentPageEvent = event;
      this.isLoading = false;
    },
      error => {
        this.notifierService.notify('error', error.error.status
        );
        this.isLoading = false;
      });
    return event;
  }

  routeBack() {
    this._location.back();
  }


  details(userid) {
    this.hrprofileService.viewedProfileNotification(this.jobid, userid).subscribe((response: any) => {
      this.router.navigate(['/hr-profile/employer-details', userid, this.jobid]);
    },
      error => {
      });
  }


  approvalstatus(userid, status) {
    this.hrprofileService.jobApprovalStatus(this.jobid, userid, status).subscribe((response: any) => {
      if (status == 1) {
        this.notifierService.notify('success', "Profile Approved!"
        );
      }
      else {
        this.notifierService.notify('success', "Profile declined!"
        );
      }
      this.getAppliedUsersOfJob(this.jobid, this.currentPageEvent, true);

    },
      error => {
      });
  }

}
