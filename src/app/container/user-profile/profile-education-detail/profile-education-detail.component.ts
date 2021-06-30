import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalDetailsService } from '../../personal-details/personal-details.service';
import { achievements, EducationData } from './educationdata.model';

@Component({
  selector: 'app-profile-education-detail',
  templateUrl: './profile-education-detail.component.html',
  styleUrls: ['./profile-education-detail.component.css']
})
export class ProfileEducationDetailComponent implements OnInit {
  data: EducationData;
  ac: any;
  isLoading = false;
  constructor(private personaldetailservice: PersonalDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.getEducationDetail();
  }
  editEducationalDetail() {
    this.personaldetailservice.enableEditMode();
    this.router.navigate(['/personal-details/education']);
  }
  getEducationDetail() {
    this.isLoading = true;

    this.personaldetailservice.getEducationalDetailsData().subscribe((response: EducationData) => {
      this.data = response;
    }, error => {
    });
    this.isLoading = false;

  }

}
