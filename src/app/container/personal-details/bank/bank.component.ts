import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { AuthService } from '../../home/auth.service';
import { PersonalDetailsService } from '../personal-details.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  navigationSubscription: Subscription;
  myUserId: string;
  BankForm: NgForm;
  isLoading = false;
  isTrue = true;
  bdData: any;

  constructor(private route: ActivatedRoute, public authservice: AuthService, public personaldetailService: PersonalDetailsService, private readonly notifierService: NotifierService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.myUserId = this.authservice.userid();
    if (this.personaldetailService.editMode()) {
      this.getBankDetailsFormData();
    }

  }


  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }


  submitBankForm(BankForm) {
    this.isLoading = true;
    this.personaldetailService.addBankDetails(BankForm.value).subscribe(resData => {
      this.isLoading = false;

      this.router.navigate(['/personal-details/documents']);
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
    // BankForm.reset();
  }
  onReset(BankForm) {
    BankForm.reset();
  }
  getBankDetailsFormData() {
    this.isLoading = true;
    this.personaldetailService.getBankDetailsData().subscribe(response => {
      this.bdData = response;
    },
      error => {

      });
    this.isLoading = false;

  }
}
