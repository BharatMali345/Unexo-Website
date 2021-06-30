import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { HrProfileService } from '../hr-profile.service';

@Component({
  selector: 'app-view-posted-jobs',
  templateUrl: './view-posted-jobs.component.html',
  styleUrls: ['./view-posted-jobs.component.css']
})
export class ViewPostedJobsComponent implements OnInit {
  jobs: any;
  isLoading = false;
  navigationSubscription: Subscription;
  pageEvent: PageEvent;
  public dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private hrprofileService: HrProfileService, private router: Router, private notifierService: NotifierService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ViewPostedJobs(null);
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  ViewPostedJobs(event?: PageEvent) {
    this.hrprofileService.getPostedJobs(event).subscribe((response: any) => {
      this.jobs = response.data;
      this.currentPage = response.pageIndex;
      this.pageSize = response.pageSize;
      this.totalSize = response.totalSize;
      document.body.scrollTop = 0;

    },
      error => {
      });
    return event;
  }

  deleteJob(jobId) {
    this.isLoading = true;
    this.hrprofileService.deleteJob(jobId).subscribe(response => {
      this.notifierService.notify("success", "Deleted SuccessFully");
      this.isLoading = false;
      this.ViewPostedJobs();
    },
      error => {
        this.notifierService.notify("error", error.error.status);
        this.isLoading = false;
      });
  }

  viewAppliedUsers(jobId, jobtitle) {
    this.router.navigate(['/hr-profile/applied-users/', jobId, jobtitle]);
  }
}
