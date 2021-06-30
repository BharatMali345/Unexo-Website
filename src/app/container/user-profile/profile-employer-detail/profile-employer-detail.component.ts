import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalDetailsService } from '../../personal-details/personal-details.service';
import { EducationData } from '../profile-education-detail/educationdata.model';
import { EmployerData } from './employer.model';

@Component({
  selector: 'app-profile-employer-detail',
  templateUrl: './profile-employer-detail.component.html',
  styleUrls: ['./profile-employer-detail.component.css']
})
export class ProfileEmployerDetailComponent implements OnInit {
  isLoading = false;
  data: EmployerData;
  ac: any;
  nodata = false;


  constructor(private personaldetailservice: PersonalDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployerDetail();
  }
  editEmployerDetails() {
    this.personaldetailservice.enableEditMode();
    this.router.navigate(['/personal-details/employer']);
  }
  getEmployerDetail() {
    this.isLoading = true;
    this.personaldetailservice.getEmployerDetailsData().subscribe((response: EmployerData) => {
      this.data = response;
      if (this.data.status == '') {
        this.nodata = true;
      }
    }, error => {
    });
    this.isLoading = false;

  }

}
