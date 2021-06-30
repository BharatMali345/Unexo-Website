import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalService } from 'src/app/components/local.service';
import { AuthService } from 'src/app/container/home/auth.service';
import { PersonalDetailsService } from 'src/app/container/personal-details/personal-details.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {

  myUserStatus: number;
  navigationSubscription: Subscription;
  authSubscription: Subscription;
  personalSubscription: Subscription;



  constructor(public authService: AuthService, public personalDetailsService: PersonalDetailsService, private router: Router, public localService: LocalService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.myUserStatus = +this.authService.userStatus();
      }
    });
  }

  ngOnInit(): void {
    this.personalSubscription = this.personalDetailsService.refreshNeeded$.subscribe((res) => {

      this.fetchStatus();
    });
  }


  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
    this.personalSubscription.unsubscribe();
  }


  fetchStatus() {
    this.personalDetailsService.getUserStatus().subscribe(response => {
      this.myUserStatus = +response.status;
      localStorage.setItem('UserStatus', this.localService.encryptData(response.status));
    },
      error => {
      });
  }

}

