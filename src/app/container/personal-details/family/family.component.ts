import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../../home/auth.service';
import { PersonalDetailsService } from '../personal-details.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
  FamilyForm: NgForm;
  navigationSubscription: Subscription;
  myUserId: string;
  isLoading = false;
  isTrue = true;
  fdData: any;


  constructor(private route: ActivatedRoute, public authservice: AuthService, public personaldetailService: PersonalDetailsService, private readonly notifierService: NotifierService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.myUserId = this.authservice.userid();
    if (this.personaldetailService.editMode()) {
      this.getFamilyDetailsFormData();
    }
  }


  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }


  submitFamilyForm(FamilyForm) {
    this.isLoading = true;

    this.personaldetailService.addFamilyDetails(FamilyForm.value).subscribe(resData => {

      this.isLoading = false;

      this.router.navigate(['/personal-details/bank']);
      if (this.personaldetailService.editMode()) {
        this.notifierService.notify("success", " Updated Successfully");
      }
      else {
        this.notifierService.notify("success", " Inserted Successfully");

      }
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;

      }
    );
    // FamilyForm.reset();
  }


  onReset(FamilyForm) {
    FamilyForm.reset();
  }


  getFamilyDetailsFormData() {
    this.isLoading = true;
    this.personaldetailService.getFamilyDetailsData().subscribe(response => {
      this.fdData = response;
    },
      error => {

      });
    this.isLoading = false;

  }
}
