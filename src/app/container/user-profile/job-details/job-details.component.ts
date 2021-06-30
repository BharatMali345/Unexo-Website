import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { Job } from '../apply-jobs/job.model';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  isLoading = false;
  jobs: Job;
  private sub: any;
  jobid: number;
  navigationSubscription: Subscription;
  constructor(private userprofileService: UserProfileService, private router: Router, private notifierService: NotifierService, private route: ActivatedRoute, private _location: Location) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.sub = this.route.params.subscribe(params => {
          this.jobid = +params['jobId']; // (+) converts string 'id' to a number
          // In a real app: dispatch action to load the details here.
        });
        this.getJobDetails(this.jobid);
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
    this.sub.unsubscribe();
  }

  getJobDetails(jobid) {
    this.isLoading = true;

    this.userprofileService.getJobDetails(jobid).subscribe((response: Job) => {
      this.jobs = response;
      this.isLoading = false;
    },
      error => {
        this.notifierService.notify('error', error.error.status
        );
        this.isLoading = false;
      });
  }

  routeBack() {
    this._location.back();
  }
  applyJob(jobId) {
    this.isLoading = true;
    this.userprofileService.applyJob(jobId).subscribe(response => {
      this.notifierService.notify("success", "Applied SuccessFully");
      this.isLoading = false;
      this.getJobDetails(this.jobid);
    },
      error => {
        this.notifierService.notify("error", error.error.status);
        this.isLoading = false;

      });
  }
}
