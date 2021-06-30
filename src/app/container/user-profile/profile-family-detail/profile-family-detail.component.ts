import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalDetailsService } from '../../personal-details/personal-details.service';

@Component({
  selector: 'app-profile-family-detail',
  templateUrl: './profile-family-detail.component.html',
  styleUrls: ['./profile-family-detail.component.css']
})
export class ProfileFamilyDetailComponent implements OnInit {
  isLoading = false;
  data: any;
  constructor(private personaldetailservice: PersonalDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.getFamilyDetails();
  }
  editFamilyDetails() {
    this.personaldetailservice.enableEditMode();
    this.router.navigate(['/personal-details/family']);
  }
  getFamilyDetails() {
    this.isLoading = true;
    this.personaldetailservice.getFamilyDetailsData().subscribe(response => {
      this.data = response;
    }, error => {
    });
    this.isLoading = false;

  }


}
