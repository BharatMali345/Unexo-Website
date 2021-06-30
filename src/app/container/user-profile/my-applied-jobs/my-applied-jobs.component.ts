import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { UserProfileService } from '../user-profile.service';
import { Job } from '../apply-jobs/job.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../home/auth.service';

@Component({
  selector: 'app-my-applied-jobs',
  templateUrl: './my-applied-jobs.component.html',
  styleUrls: ['./my-applied-jobs.component.css']
})
export class MyAppliedJobsComponent implements OnInit {
  isLoading = false;
  jobs: Job;
  config: any;
  total: number;
  navigationSubscription: Subscription;
  nodata = false;
  pageEvent: PageEvent;
  seti: number;
  public dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private userprofileService: UserProfileService, private router: Router, private notifierService: NotifierService, private authservice: AuthService) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ViewMyAppliedJobs(null);
      }
    });

  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  ViewMyAppliedJobs(event?: PageEvent) {
    this.isLoading = true;
    this.userprofileService.getMyAppliedJobDetails(event).subscribe((response: any) => {
      this.jobs = response.data;
      this.currentPage = response.pageIndex;
      this.pageSize = response.pageSize;
      this.totalSize = response.totalSize;
      document.body.scrollTop = 0;
      if (Object.keys(this.jobs).length == 0) {
        this.nodata = true;
      }
      this.isLoading = false;
    },
      error => {
        this.notifierService.notify('error', error.error.status
        );
        this.isLoading = false;
      });

    return event;


  }



  routeToJobDetails(jobId) {
    this.router.navigate(['/user-profile/job-details', jobId]);
  }

}
