import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalService } from 'src/app/components/local.service';
import { AuthService } from '../home/auth.service';
import { PersonalDetailsService } from '../personal-details/personal-details.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  panelOpenState = false;

  myUserStatus: number;
  navigationSubscription: Subscription;
  personalSubscription: Subscription;
  progressbarvalue: number;


  constructor(public authService: AuthService, public personalDetailsService: PersonalDetailsService, private router: Router, private localservice: LocalService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.myUserStatus = +this.authService.userStatus();
      }
    });
  }

  ngOnInit(): void {
    if (this.localservice.decryptData(localStorage.getItem('UserStatus')) == 0) {
      this.progressbarvalue = 0;
    }
    else if (this.localservice.decryptData(localStorage.getItem('UserStatus')) == 1) {
      this.progressbarvalue = 25;
    }
    else if (this.localservice.decryptData(localStorage.getItem('UserStatus')) == 2) {
      this.progressbarvalue = 50;
    }
    else if (this.localservice.decryptData(localStorage.getItem('UserStatus')) == 3) {
      this.progressbarvalue = 75;
    }
    else {
      this.progressbarvalue = 100;
    }

  }
  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
  onActivate(event) {
    document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }
  toUserNotifications() {
    this.router.navigate(['/user-profile/user-notifications']);
  }
}
