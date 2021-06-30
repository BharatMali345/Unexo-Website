import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalDetailsService } from '../../personal-details/personal-details.service';

@Component({
  selector: 'app-profile-work-detail',
  templateUrl: './profile-work-detail.component.html',
  styleUrls: ['./profile-work-detail.component.css']
})
export class ProfileWorkDetailComponent implements OnInit {
  isLoading = false;
  data: any;
  nodata = false;
  constructor(private personaldetailservice: PersonalDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.getWorkDetails();
  }
  editWorkDetails() {
    this.personaldetailservice.enableEditMode();
    this.router.navigate(['/personal-details/work']);
  }
  getWorkDetails() {
    this.isLoading = true;
    this.personaldetailservice.getWorkDetailsData().subscribe(response => {
      this.data = response;
      if (this.data.status == '') {
        this.nodata = true;
      }
    }, error => {

    });
    this.isLoading = false;

  }

}
