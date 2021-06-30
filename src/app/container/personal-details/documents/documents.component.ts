import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../home/auth.service';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { PersonalDetailsService } from '../personal-details.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  navigationSubscription: Subscription;
  myUserId: string;
  formData: FormData = new FormData();
  isLoading = false;
  pancard1 = false;
  photo1 = false;
  aadhar1 = false;
  passport1 = false;
  tenth1 = false;
  twelfth1 = false;
  graduation1 = false;
  postGraduation1 = false;
  offer1 = false;
  resignation1 = false;
  resume1 = false;

  constructor(private router: Router, private authservice: AuthService, public personaldetailService: PersonalDetailsService, private readonly notifierService: NotifierService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.myUserId = this.authservice.userid();

  }


  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }


  ngAfterViewInit() {


    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#output').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
      }
    }

    $("#file").change(function () {
      readURL(this);
    });
  }


  setFiles(event) {
    let files = event.srcElement.files
    if (!files) {
      return
    }
    for (var i = 0; i < files.length; i++) {
      this.formData.append(i.toString(), files[i], files[i].name);
    }
  }


  submitPancard(Form: NgForm) {
    this.isLoading = true;

    this.formData.append("data", JSON.stringify(Form.value));
    this.personaldetailService.uploadDocuments(this.formData).subscribe(resData => {
      this.notifierService.notify("success", " Uploaded Successfully");
      this.isLoading = false;
      this.pancard1 = true;
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');
      }
    );

    this.ngOnInit();
  }


  submitPhoto(Form: NgForm) {
    this.isLoading = true;
    this.formData.append("data", JSON.stringify(Form.value));
    this.personaldetailService.uploadDocuments(this.formData).subscribe(resData => {
      this.notifierService.notify("success", " Uploaded Successfully");
      this.isLoading = false;
      this.photo1 = true;
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');
      }
    );

    this.ngOnInit();
  }


  submitAadhar(Form: NgForm) {
    this.isLoading = true;
    this.formData.append("data", JSON.stringify(Form.value));
    this.personaldetailService.uploadDocuments(this.formData).subscribe(resData => {
      this.notifierService.notify("success", " Uploaded Successfully");
      this.isLoading = false;
      this.aadhar1 = true;
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');
      }
    );

    this.ngOnInit();
  }
  submitPassport(Form: NgForm) {
    this.isLoading = true;
    this.formData.append("data", JSON.stringify(Form.value));
    this.personaldetailService.uploadDocuments(this.formData).subscribe(resData => {
      this.notifierService.notify("success", " Uploaded Successfully");
      this.isLoading = false;
      this.passport1 = true;
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');
      }
    );



    this.ngOnInit();

  }
  submitTenth(Form: NgForm) {
    this.isLoading = true;
    this.formData.append("data", JSON.stringify(Form.value));
    this.personaldetailService.uploadDocuments(this.formData).subscribe(resData => {
      this.notifierService.notify("success", " Uploaded Successfully");
      this.isLoading = false;
      this.tenth1 = true;
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');
      }
    );


    this.ngOnInit();

  }
  submitGraduation(Form: NgForm) {
    this.isLoading = true;

    this.formData.append("data", JSON.stringify(Form.value));
    this.personaldetailService.uploadDocuments(this.formData).subscribe(resData => {
      this.notifierService.notify("success", " Uploaded Successfully");
      this.isLoading = false;
      this.graduation1 = true;
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');
      }
    );


    this.ngOnInit();

  }
  submitTwelfth(Form: NgForm) {
    this.isLoading = true;

    this.formData.append("data", JSON.stringify(Form.value));
    this.personaldetailService.uploadDocuments(this.formData).subscribe(resData => {
      this.notifierService.notify("success", " Uploaded Successfully");
      this.isLoading = false;
      this.twelfth1 = true;
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');
      }
    );

    this.ngOnInit();
  }
  submitPostGraduation(Form: NgForm) {
    this.isLoading = true;

    this.formData.append("data", JSON.stringify(Form.value));
    this.personaldetailService.uploadDocuments(this.formData).subscribe(resData => {
      this.notifierService.notify("success", " Uploaded Successfully");
      this.isLoading = false;
      this.postGraduation1 = true;
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {

        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');
      }
    );

    this.ngOnInit();
  }
  submitOfferLetter(Form: NgForm) {
    this.isLoading = true;

    this.formData.append("data", JSON.stringify(Form.value));
    this.personaldetailService.uploadDocuments(this.formData).subscribe(resData => {
      this.notifierService.notify("success", " Uploaded Successfully");
      this.isLoading = false;
      this.offer1 = true;
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');
      }
    );

    this.ngOnInit();
  }
  submitResignationLetter(Form: NgForm) {
    this.isLoading = true;

    this.formData.append("data", JSON.stringify(Form.value));
    this.personaldetailService.uploadDocuments(this.formData).subscribe(resData => {
      this.notifierService.notify("success", " Uploaded Successfully");
      this.isLoading = false;
      this.resignation1 = true;
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');
      }
    );

    this.ngOnInit();
  }
  submitResume(Form: NgForm) {
    this.isLoading = true;

    this.formData.append("data", JSON.stringify(Form.value));
    this.personaldetailService.uploadDocuments(this.formData).subscribe(resData => {
      this.notifierService.notify("success", " Uploaded Successfully");
      this.isLoading = false;
      this.resume1 = true;
      this.formData.delete('data');
      this.formData.delete('0');
    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;
        this.formData.delete('data');
        this.formData.delete('0');
      }
    );

    this.ngOnInit();
  }
  completeRegistration(Form: NgForm) {
    this.isLoading = true;

    this.personaldetailService.completeRegistration(Form.value).subscribe(resData => {
      this.notifierService.notify("success", " Registration Completed Successfully");
      this.isLoading = false;
      this.router.navigate(['/user-profile']);

    },
      errorMessage => {
        this.notifierService.notify("error", errorMessage.error.status);
        this.isLoading = false;

      }
    );
    this.ngOnInit();
  }
}
