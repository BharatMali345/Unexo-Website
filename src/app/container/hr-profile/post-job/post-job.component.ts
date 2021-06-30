import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { AuthService } from '../../home/auth.service';
import { PersonalDetailsService } from '../../personal-details/personal-details.service';
import { HrProfileService } from '../hr-profile.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  postJobForm: any;
  navigationSubscription: Subscription;
  myUserId: string;
  isLoading = false;
  edData: any;
  mainArray: [] = [];
  otherArray: [] = [];
  subIndustry: [];
  value: string;
  startSalary: number;
  Salary: any = ["0 lac", "1 lac"];
  Industaries = [
    {
      "industryName": "Farming"
    },
    {
      "industryName": "Dairy"
    },
    {
      "industryName": "Agriculture"
    },
    {
      "industryName": "Food Processing"
    },
    {
      "industryName": "Supply Chain"
    },
    {
      "industryName": "Water Treatments"
    },
    {
      "industryName": "Spices and Dry Fruits"
    },
    {
      "industryName": "Real Estate"
    },
    {
      "industryName": "Mega Housing"
    },
    {
      "industryName": "Developing"
    },
    {
      "industryName": "Public Service"
    },
    {
      "industryName": "Electric Service"
    },
    {
      "industryName": "News Agency"
    },
    {
      "industryName": "Online Shops"
    },
    {
      "industryName": "I.T Services"
    },
    {
      "industryName": "Health service"
    },
    {
      "industryName": "Insurance Brokerage Firms"
    },
    {
      "industryName": "Educational"
    },
    {
      "industryName": "Money Transfer"
    },
    {
      "industryName": "Textile"
    },
    {
      "industryName": "Factory"
    },
  ];
  constructor(private route: ActivatedRoute, public personalDetailService: PersonalDetailsService, private readonly notiiferservice: NotifierService, private authService: AuthService, private router: Router, private hrProfileService: HrProfileService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.myUserId = this.authService.userid();
        if (this.personalDetailService.editMode()) {
          this.postJobForm = new FormGroup({
            jobTitle: new FormControl('', Validators.compose([Validators.required])),
            companyName: new FormControl('', Validators.required),
            expYears: new FormControl('', Validators.required),
            jobLocation: new FormControl('', Validators.required),
            openings: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
            salary: new FormControl('', Validators.required),
            maxApplicants: new FormControl('', Validators.required),
            applicantResponsibilities: new FormControl(''),
            skillRequirements: new FormControl('', Validators.required),
            industryType: new FormControl('', Validators.required),
            functionalArea: new FormControl('', Validators.required),
            employmentType: new FormControl('', Validators.required),
            underGraduate: new FormControl('', Validators.required),
            postGraduate: new FormControl(''),
            aboutCompany: new FormControl('', Validators.required),
            websiteCompany: new FormControl(''),
            userId: new FormControl(this.myUserId),
            editMode: new FormControl(this.personalDetailService.editMode()),
            keySkills: new FormArray([]),
          });
          // this.getEmployerDetailsFormData();
        }
        else {
          this.postJobForm = new FormGroup({
            jobTitle: new FormControl('', Validators.required),
            companyName: new FormControl('', Validators.required),
            expYears: new FormControl('', Validators.required),
            jobLocation: new FormControl('', Validators.required),
            openings: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
            salary: new FormControl('', Validators.required),
            maxApplicants: new FormControl('', Validators.required),
            applicantResponsibilities: new FormControl(''),
            skillRequirements: new FormControl('', Validators.required),
            industryType: new FormControl('', Validators.required),
            functionalArea: new FormControl('', Validators.required),
            employmentType: new FormControl('', Validators.required),
            underGraduate: new FormControl('', Validators.required),
            postGraduate: new FormControl(''),
            aboutCompany: new FormControl('', Validators.required),
            websiteCompany: new FormControl(''),
            userId: new FormControl(this.myUserId),
            keySkills: new FormArray([]),
          });
        }
      }
    });
  }


  ngOnInit(): void {
    this.generateSalaryArray();
  }


  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }


  get f() { return this.postJobForm.controls; }

  addKeySkills() {
    this.postJobForm.get('keySkills').push(new FormGroup({
      skills: new FormControl('')
    }))
  }

  // addOtherAbility() {
  //   this.employerForm.get('otherAbility').push(new FormGroup({
  //     otherabilities: new FormControl('')
  //   }))
  // }

  deleteKeySkills(i: number) {
    this.postJobForm.get('keySkills').removeAt(i);
  }

  // deleteOtherAbility(j: number) {
  //   this.employerForm.get('otherAbility').removeAt(j);
  // }

  onSubmit() {
    this.isLoading = true;
    this.hrProfileService.postJob(this.postJobForm.value).subscribe(response => {

      this.isLoading = false;

      this.router.navigate(['/hr-profile/posted-jobs']);
      if (this.personalDetailService.editMode()) {
        this.notiiferservice.notify("success", "Updated  Successfully");
      }
      else {
        this.notiiferservice.notify("success", "Posted Successfully");
      }
      // this.ngOnInit();
    }, error => {
      this.notiiferservice.notify("error", error.error.status);
      this.isLoading = false;

    });
  }

  // onReset() {
  //   this.employerForm.reset();
  // }

  // onSkip() {
  //   this.router.navigate(['/user-profile']);
  // }

  // getEmployerDetailsFormData() {
  //   this.isLoading = true;
  //   this.personalDetailService.getEmployerDetailsData().subscribe(response => {
  //     this.edData = response;
  //     this.value = this.edData.industryName;
  //     this.personalDetailService.getSubIndustry(this.value).subscribe(response => {
  //       this.subIndustry = response;
  //     },
  //       error => {
  //       });
  //     this.employerForm.patchValue(
  //       {

  //         industryName: this.edData.industryName,
  //         jobType: this.edData.jobType,
  //         functionalArea: this.edData.functionalArea,
  //         designation: this.edData.designation,
  //         itSkills: this.edData.itSkills,
  //         role: this.edData.role,
  //         salary: this.edData.salary,
  //         experience: this.edData.experience,
  //         shift: this.edData.shift,
  //         languages: this.edData.languages,
  //         joiningDate: this.edData.joiningDate,
  //         endDate: this.edData.endDate,
  //       });
  //     this.mainArray = this.edData.skillAbilities || [];
  //     this.mainArray.forEach((x) => {
  //       this.formArr.push(new FormGroup({
  //         mainabilities: new FormControl(x['mainabilities'])
  //       }))
  //     });
  //     this.otherArray = this.edData.otherAbilities || [];
  //     this.otherArray.forEach((x) => {
  //       this.formArr1.push(new FormGroup({
  //         otherabilities: new FormControl(x['otherabilities'])
  //       }))
  //     });
  //   },
  //     error => {

  //     });
  //   this.isLoading = false;

  // }
  // get formArr() {
  //   return this.employerForm.get('mainAbility') as FormArray;
  // }
  // get formArr1() {
  //   return this.employerForm.get('otherAbility') as FormArray;
  // }

  onChangeSubIndustry(value: string) {
    this.personalDetailService.getSubIndustry(value).subscribe(response => {
      this.subIndustry = response;
    },
      error => {
      });
  }

  generateSalaryArray() {
    this.startSalary = 1;
    while (this.startSalary < 100) {
      this.startSalary = this.startSalary + 1;
      this.Salary.push(this.startSalary + ' lacs');
    }
    return this.Salary;
  }
}
