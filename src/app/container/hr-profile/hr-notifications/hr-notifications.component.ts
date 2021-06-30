import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { AuthService } from '../../home/auth.service';
import { UserProfileService } from '../../user-profile/user-profile.service';
import { HrProfileService } from '../hr-profile.service';

@Component({
  selector: 'app-hr-notifications',
  templateUrl: './hr-notifications.component.html',
  styleUrls: ['./hr-notifications.component.css']
})
export class HrNotificationsComponent implements OnInit {

  userid: number;
  navigationSubscription: Subscription;
  data: any;
  isLoading = false;
  nodata = false;
  total: number;
  pageEvent: PageEvent;
  public pageSize = 20;
  public currentPage = 0;
  public totalSize = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private hrprofileService: HrProfileService, private router: Router, private authService: AuthService, private userprofileservice: UserProfileService, private notifierService: NotifierService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getusernotifications(null);
      }
    });
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
  getusernotifications(event?: PageEvent) {
    this.userprofileservice.getUserNotifications().subscribe((response: any) => {
      this.isLoading = true;
      this.data = response.data;
      this.currentPage = response.pageIndex;
      this.pageSize = response.pageSize;
      this.totalSize = response.totalSize;
      document.body.scrollTop = 0;
      if (Object.keys(this.data).length == 0) {
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
  routeToJobDetails(jobid, userid) {
    this.hrprofileService.viewedProfileNotification(jobid, userid).subscribe((response: any) => {
      this.router.navigate(['/hr-profile/employer-details', userid, jobid]);
    },
      error => {
      });
  }

}
