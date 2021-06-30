import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { LocalService } from 'src/app/components/local.service';
import { AuthService } from '../../home/auth.service';
import { PersonalDetailsService } from '../personal-details.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit, AfterViewInit {
  employerForm: any;
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
  joiningDate = new Date();
  endDate = new Date();
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
  constructor(private route: ActivatedRoute, public personalDetailService: PersonalDetailsService, private readonly notiiferservice: NotifierService, private authService: AuthService, private router: Router, private localservice: LocalService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.myUserId = this.authService.userid();
        if (this.personalDetailService.editMode()) {
          this.employerForm = new FormGroup({
            industryName: new FormControl('', Validators.required),
            jobType: new FormControl('', Validators.required),
            functionalArea: new FormControl('', Validators.required),
            designation: new FormControl('', Validators.required),
            itSkills: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
            salary: new FormControl('', Validators.required),
            experience: new FormControl('', Validators.required),
            shift: new FormControl('', Validators.required),
            languages: new FormControl('', Validators.required),
            joiningDate: new FormControl('', Validators.required),
            endDate: new FormControl(''),
            userId: new FormControl(this.myUserId),
            editMode: new FormControl(this.personalDetailService.editMode()),
            mainAbility: new FormArray([]),
            otherAbility: new FormArray([]),
          });
          this.getEmployerDetailsFormData();
        }
        else {
          this.employerForm = new FormGroup({
            industryName: new FormControl('', Validators.required),
            jobType: new FormControl('', Validators.required),
            functionalArea: new FormControl('', Validators.required),
            designation: new FormControl('', Validators.required),
            itSkills: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
            salary: new FormControl('', Validators.required),
            experience: new FormControl('', Validators.required),
            shift: new FormControl('', Validators.required),
            languages: new FormControl('', Validators.required),
            joiningDate: new FormControl('', Validators.required),
            endDate: new FormControl(''),
            userId: new FormControl(this.myUserId),
            mainAbility: new FormArray([]),
            otherAbility: new FormArray([]),
          });
        }
      }
    });
  }


  ngOnInit(): void {
    this.generateSalaryArray();
  }

  ngAfterViewInit() {


  }

  compareDate() {
    var fit_start_time = $("#joiningDate").val();
    var fit_end_time = $("#endDate").val();

    if (new Date(fit_start_time) >= new Date(fit_end_time)) {
      $("#endDate").val(null);
      alert("Please select End Date Greater Than Joining Date.");
    }
  }



  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }


  get f() { return this.employerForm.controls; }

  addMainAbility() {
    this.employerForm.get('mainAbility').push(new FormGroup({
      mainabilities: new FormControl('')
    }))
  }

  addOtherAbility() {
    this.employerForm.get('otherAbility').push(new FormGroup({
      otherabilities: new FormControl('')
    }))
  }

  deleteMainAbility(i: number) {
    this.employerForm.get('mainAbility').removeAt(i);
  }

  deleteOtherAbility(j: number) {
    this.employerForm.get('otherAbility').removeAt(j);
  }

  onSubmit() {
    this.isLoading = true;
    console.log(this.employerForm.value);
    this.personalDetailService.addEmployerDetails(this.employerForm.value).subscribe(response => {

      this.isLoading = false;

      this.router.navigate(['/user-profile']);
      if (this.personalDetailService.editMode()) {
        localStorage.setItem('UserStatus', this.localservice.encryptData(4));


        this.notiiferservice.notify("success", "Updated Employer Details Successfully");

      }
      else {

        localStorage.setItem('UserStatus', this.localservice.encryptData(4));
        this.notiiferservice.notify("success", "Added Employer Details Successfully");

      }
      // this.ngOnInit();
    }, error => {
      this.notiiferservice.notify("error", error.error.status);
      this.isLoading = false;

    });
    // this.employerForm.reset();
  }

  onReset() {
    this.employerForm.reset();
  }

  onSkip() {
    this.router.navigate(['/user-profile']);
  }

  getEmployerDetailsFormData() {
    this.isLoading = true;
    this.personalDetailService.getEmployerDetailsData().subscribe(response => {
      this.edData = response;
      this.value = this.edData.industryName;
      this.personalDetailService.getSubIndustry(this.value).subscribe(response => {
        this.subIndustry = response;
      },
        error => {
        });
      this.employerForm.patchValue(
        {

          industryName: this.edData.industryName,
          jobType: this.edData.jobType,
          functionalArea: this.edData.functionalArea,
          designation: this.edData.designation,
          itSkills: this.edData.itSkills,
          role: this.edData.role,
          salary: this.edData.salary,
          experience: this.edData.experience,
          shift: this.edData.shift,
          languages: this.edData.languages,
          joiningDate: this.edData.joiningDate,
          endDate: this.edData.endDate,
        });
      this.mainArray = this.edData.skillAbilities || [];
      this.mainArray.forEach((x) => {
        this.formArr.push(new FormGroup({
          mainabilities: new FormControl(x['mainabilities'])
        }))
      });
      this.otherArray = this.edData.otherAbilities || [];
      this.otherArray.forEach((x) => {
        this.formArr1.push(new FormGroup({
          otherabilities: new FormControl(x['otherabilities'])
        }))
      });
    },
      error => {

      });
    this.isLoading = false;

  }
  get formArr() {
    return this.employerForm.get('mainAbility') as FormArray;
  }
  get formArr1() {
    return this.employerForm.get('otherAbility') as FormArray;
  }

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
