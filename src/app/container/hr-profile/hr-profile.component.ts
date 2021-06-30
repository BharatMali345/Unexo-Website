import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalService } from 'src/app/components/local.service';
import { HrService } from '../hr-login/hr.service';
import { PersonalDetailsService } from '../personal-details/personal-details.service';

@Component({
  selector: 'app-hr-profile',
  templateUrl: './hr-profile.component.html',
  styleUrls: ['./hr-profile.component.css']
})
export class HrProfileComponent implements OnInit {
  panelOpenState = false;
  userstatus: number;
  navigationSubscription: Subscription;
  progressbarvalue: number;
  constructor(public HrService: HrService, public personalDetailsService: PersonalDetailsService, private router: Router, private localservice: LocalService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.personalDetailsService.getUserStatus().subscribe(res => {
          this.userstatus = res.status;

        });
      }
    });
  }

  ngOnInit(): void {
    if (this.localservice.decryptData(localStorage.getItem('UserStatus')) == 0) {
      this.progressbarvalue = 0;
    }
    else {
      this.progressbarvalue = 100;
    }
  }
  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
  editMode() {
    this.personalDetailsService.enableEditMode();
    this.router.navigate(['/hr-profile/details']);
  }
  routeToPostJob() {
    if (this.personalDetailsService.editMode()) {
      localStorage.removeItem('editMode');
    }
    this.router.navigate(['/hr-profile']);

  }
  routeToViewPostedJobs() {
    if (this.personalDetailsService.editMode()) {
      localStorage.removeItem('editMode');
    }
    this.router.navigate(['/hr-profile/posted-jobs']);

  }
  toUserNotifications() {
    this.router.navigate(['/hr-profile/hr-notifications']);
  }
}
