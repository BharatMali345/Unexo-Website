import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalDetailsService } from '../../personal-details/personal-details.service';

@Component({
  selector: 'app-profile-documents-detail',
  templateUrl: './profile-documents-detail.component.html',
  styleUrls: ['./profile-documents-detail.component.css']
})
export class ProfileDocumentsDetailComponent implements OnInit, AfterViewInit {
  data: any;
  isLoading = false;
  constructor(private personaldetailservice: PersonalDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.getDocumentDetails();
  }
  ngAfterViewInit() {

  }
  editDocumentDetails() {
    this.personaldetailservice.enableEditMode();
    this.router.navigate(['/personal-details/documents']);
  }
  getDocumentDetails() {
    this.isLoading = true;
    this.personaldetailservice.getDocumentDetailsData().subscribe(response => {
      this.data = response;
    }, error => {
    });
    this.isLoading = false;

  }

}
