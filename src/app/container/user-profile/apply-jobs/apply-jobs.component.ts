import { AfterViewInit, ApplicationRef, Component, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { UserProfileService } from '../user-profile.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-apply-jobs',
  templateUrl: './apply-jobs.component.html',
  styleUrls: ['./apply-jobs.component.css']
})
export class ApplyJobsComponent implements OnInit, AfterViewInit {
  isLoading = false;
  config: any;
  total: number;
  navigationSubscription: Subscription;
  pageEvent: PageEvent;
  public dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public currentPageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private userprofileService: UserProfileService, private router: Router, private notifierService: NotifierService, private appRef: ApplicationRef) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ViewAllPostedJobs(null, false);
      }
    });

  }
  ngAfterViewInit() { }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  public ViewAllPostedJobs(event?: PageEvent, scrollWatcher?: boolean) {
    this.isLoading = true;
    this.userprofileService.getAllJobs(event).subscribe((response: any) => {
      this.dataSource = response.data;
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
  applyJob(jobId, currentpageevent) {
    this.isLoading = true;
    this.userprofileService.applyJob(jobId).subscribe(response => {
      this.notifierService.notify("success", "Applied SuccessFully");
      this.isLoading = false;
      this.ViewAllPostedJobs(currentpageevent, true);

    },
      error => {
        this.notifierService.notify("error", error.error.status);
        this.isLoading = false;

      });
  }

  routeToJobDetails(jobId) {
    this.router.navigate(['/user-profile/job-details', jobId]);
  }



}
