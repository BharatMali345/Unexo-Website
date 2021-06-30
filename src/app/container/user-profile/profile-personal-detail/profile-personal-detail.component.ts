import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalDetailsService } from '../../personal-details/personal-details.service';

@Component({
  selector: 'app-profile-personal-detail',
  templateUrl: './profile-personal-detail.component.html',
  styleUrls: ['./profile-personal-detail.component.css']
})
export class ProfilePersonalDetailComponent implements OnInit {
  data: any;
  isLoading = false;
  constructor(private personaldetailservice: PersonalDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.getPersonalDetails();
  }
  editPersonalDetail() {
    this.personaldetailservice.enableEditMode();
    this.router.navigate(['/personal-details']);
  }
  getPersonalDetails() {
    this.isLoading = true;
    this.personaldetailservice.getPersonalDetailsData().subscribe(response => {
      this.data = response;
    }, error => {
    });
    this.isLoading = false;

  }

}
