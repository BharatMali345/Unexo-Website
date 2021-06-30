import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalDetailsService } from '../../personal-details/personal-details.service';

@Component({
  selector: 'app-profile-bank-detail',
  templateUrl: './profile-bank-detail.component.html',
  styleUrls: ['./profile-bank-detail.component.css']
})
export class ProfileBankDetailComponent implements OnInit {
  data: any;
  isLoading = false;
  constructor(private personaldetailservice: PersonalDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.getBankDetails();
  }
  editBankDetails() {
    this.personaldetailservice.enableEditMode();
    this.router.navigate(['/personal-details/bank']);
  }
  getBankDetails() {
    this.isLoading = true;
    this.personaldetailservice.getBankDetailsData().subscribe(response => {
      this.data = response;
    }, error => {
    });
    this.isLoading = false;

  }

}
