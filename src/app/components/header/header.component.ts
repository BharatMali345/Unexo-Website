import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { AuthService } from 'src/app/container/home/auth.service';
import { PersonalDetailsService } from 'src/app/container/personal-details/personal-details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  myUserStatus: number;
  navigationSubscription: Subscription;
  authSubscription: Subscription;
  personalSubscription: Subscription;
  homeurl = false;
  adminurl = false;
  hrurl = false;




  constructor(public authService: AuthService, private personalDetailsService: PersonalDetailsService, private router: Router, private notifierservice: NotifierService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        // this.myUserStatus = +this.authService.userStatus();
        if (this.router.url === '/home') {
          this.homeurl = true;
          this.hrurl = false;
          this.adminurl = false;
        }
        else if (this.router.url === '/hr-login') {

          this.hrurl = true;
          this.adminurl = false;
          this.homeurl = false;
        }
        else {
          this.adminurl = true;
          this.hrurl = false;
          this.homeurl = false;
        }
      }
    });
  }

  ngOnInit(): void {
    // this.personalSubscription = this.personalDetailsService.refreshNeeded$.subscribe((res) => {
    //   this.fetchStatus();
    // });

  }


  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
    // this.personalSubscription.unsubscribe();
  }


  // fetchStatus() {
  //   this.personalDetailsService.getUserStatus().subscribe(response => {
  //     this.myUserStatus = +response.status;
  //     localStorage.setItem('UserStatus', response.status);
  //   },
  //     error => {
  //     });
  // }
  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.notifierservice.notify('success', 'Text Copied to clipboard!');
  }
  logout() {
    if (confirm('Are You Sure You Want to Logout?')) {
      this.authService.logoutUser();
    }
  }
}
