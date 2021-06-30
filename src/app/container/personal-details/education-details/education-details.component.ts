import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { LocalService } from 'src/app/components/local.service';
import { AuthService } from '../../home/auth.service';
import { PersonalDetailsService } from '../personal-details.service';

@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css']
})
export class EducationDetailsComponent implements OnInit, AfterViewInit {
  educationalDetailsForm: any;
  navigationSubscription: Subscription;
  myUserId: string;
  isLoading = false;
  edData: any;
  academicArray: [] = [];
  data: FormGroup;
  years: number[] = [];
  startYear: number;
  courseArray = [];
  specsArray: any;


  constructor(private FB: FormBuilder, private route: ActivatedRoute, public personalDetailService: PersonalDetailsService, private readonly notiiferservice: NotifierService, private authService: AuthService, private router: Router, private localservice: LocalService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.myUserId = this.authService.userid();

        if (this.personalDetailService.editMode()) {
          this.educationalDetailsForm = new FormGroup({
            highestQualification: new FormControl('', Validators.required),
            school: new FormControl('', Validators.required),
            marks: new FormControl('', Validators.required),
            passingYear: new FormControl(''),
            specialization: new FormControl(''),
            course: new FormControl(''),
            userId: new FormControl(this.myUserId),
            editMode: new FormControl(this.personalDetailService.editMode()),
            academic: new FormArray([]),

          });
          this.getEducationalDetailsFormData();


        }
        else {
          this.educationalDetailsForm = new FormGroup({
            highestQualification: new FormControl('', Validators.required),
            school: new FormControl('', Validators.required),
            marks: new FormControl('', Validators.required),
            passingYear: new FormControl(''),
            specialization: new FormControl(''),
            course: new FormControl(''),
            userId: new FormControl(this.myUserId),
            academic: new FormArray([]),
          });
        }
        this.generateYearsArray();
      }
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }


  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }


  get f() { return this.educationalDetailsForm.controls; }


  add() {
    this.educationalDetailsForm.get('academic').push(new FormGroup({
      achievements: new FormControl('')
    }))
  }


  deleteItem(i: number) {
    this.educationalDetailsForm.get('academic').removeAt(i);
  }


  onSubmit() {
    this.isLoading = true;
    this.personalDetailService.addEducationalDetails(this.educationalDetailsForm.value).subscribe(response => {
      this.isLoading = false;
      this.router.navigate(['/personal-details/work']);
      if (this.personalDetailService.editMode()) {
        this.notiiferservice.notify("success", "Updated Educational Details Successfully");
      }
      else {
        localStorage.setItem('UserStatus', this.localservice.encryptData(+this.authService.userStatus() + 1));

        this.notiiferservice.notify("success", "Added Educational Details Successfully");
      }
      this.ngOnInit();
    }, error => {
      this.notiiferservice.notify("error", error.error.status);
      this.isLoading = false;

    });
    // this.onReset();
  }


  onReset() {
    this.educationalDetailsForm.reset();
    this.ngOnInit();
  }


  getEducationalDetailsFormData() {
    this.isLoading = true;
    this.personalDetailService.getEducationalDetailsData().subscribe(response => {
      this.edData = response;
      this.onChangeCourse(this.edData.course);
      this.onChangeQualification(this.edData.highestQualification);
      this.educationalDetailsForm.patchValue(
        {

          highestQualification: this.edData.highestQualification,
          school: this.edData.school,
          marks: this.edData.marks,
          passingYear: this.edData.passingYear,
          course: this.edData.course,
          specialization: this.edData.specialization,
          userId: this.authService.userid(),
          editMode: this.personalDetailService.editMode(),
        });

      this.academicArray = this.edData.academicAchievements || [];
      this.academicArray.forEach((x) => {
        this.formArr.push(new FormGroup({
          achievements: new FormControl(x['achievements'])
        }))
      });

    },
      error => {

      });
    this.isLoading = false;

  }


  get formArr() {
    return this.educationalDetailsForm.get('academic') as FormArray;
  }

  generateYearsArray() {
    var currentYear = new Date().getFullYear() - 1;
    this.startYear = 1940;
    while (this.startYear <= currentYear) {
      this.startYear = this.startYear + 1;
      this.years.push(this.startYear);
    }
    return this.years;
  }

  onChangeQualification(value: string) {
    this.courseArray = [];
    if (value === "12th" || value === "10th") {
      for (let data of this.educationDetails) {
        for (let datain of data.course) {
          if (data.education === "12th" || data.education === "10th") {
            this.courseArray.push(datain);
          }
        }
      }
    }
    else {
      for (let data of this.educationDetails) {
        if (data.education === value) {
          this.courseArray.push(data.course);
        }
      }
    }

  }

  onChangeCourse(value: string) {
    for (let data of this.educationDetails) {
      if (data.course === value) {
        this.specsArray = data.specialization;
        break;
      }
      else {
        if (data.education === "12th" || data.education === "10th") {
          for (let datain of data.course) {
            if (datain === value) {
              this.specsArray = data.specialization;
              break;
            }
          }
        }
      }
    }
  }

  educationDetails = [{
    "education": "Doctorate/PhD",
    "course": "Ph.D/Doctorate",
    "specialization": [
      "Advertising/Mass Communication",
      "Agriculture",
      "Anthropology",
      "Architecture",
      "Arts & Humanities",
      "Astrophysics",
      "Automobile",
      "Aviation",
      "Bio-Chemistry/Bio-Technology",
      "Bio-Medical",
      "Biophysics",
      "Bio-Technology",
      "Botany",
      "Ceramics",
      "Chemical",
      "Chemistry",
      "Civil",
      "Commerce",
      "Communication",
      "Computers",
      "Dairy Technology",
      "Dermatology",
      "Economics",
      "Education",
      "Electrical",
      "Electronics/Telecommunications",
      "Energy",
      "ENT",
      "Environmental",
      "Fashion Designing/other Designing",
      "Films",
      "Finance",
      "Fine Arts",
      "Food Technology",
      "Genetics",
      "History",
      "Home Science",
      "Hotel Management",
      "HR/Industrial Relations",
      "Immunology",
      "Instrumentation",
      "International Business",
      "Journalism",
      "Law",
      "Linguistics",
      "Marine",
      "Marketing",
      "Maths",
      "Mechnical",
      "Medicine",
      "Metallurgy",
      "Microbiology",
      "Mineral Mining",
      "Music",
      "Neonatal",
      "Nuclear",
      "Nursing",
      "Obstetrics",
      "Other Arts",
      "Other Doctorate",
      "Other Engineering",
      "Other Management",
      "Other Science",
      "Paint/Oil",
      "Pathalogy",
      "Pediatrics",
      "Petroleum",
      "Pharmacy",
      "Philosophy",
      "Physical",
      "Education",
      "Physics",
      "Plastics",
      "Political Science",
      "Production/Industrial",
      "Psychiatry",
      "Psychology",
      "Radiology",
      "Sanskrit",
      "Sociology",
      "Special Education",
      "Statistics",
      "Systems",
      "Textile",
      "Vocational Courses",
      "Zoology",
      "Others"
    ]
  },
  {
    "education": "Doctorate/PhD",
    "course": "MPHIL",
    "specialization": [
      "Advertising/Mass Communication",
      "Agriculture",
      "Anthropology",
      "Architecture",
      "Arts & Humanities",
      "Astrophysics",
      "Automobile",
      "Aviation",
      "Bio-Chemistry/Bio-Technology",
      "Bio-Medical",
      "Biophysics",
      "Bio-Technology",
      "Botany",
      "Ceramics",
      "Chemical",
      "Chemistry",
      "Civil",
      "Commerce",
      "Communication",
      "Computers",
      "Dairy Technology",
      "Dermatology",
      "Economics",
      "Education",
      "Electrical",
      "Electronics/Telecommunications",
      "Energy",
      "ENT",
      "Environmental",
      "Fashion Designing/other Designing",
      "Films",
      "Finance",
      "Fine Arts",
      "Food Technology",
      "Genetics",
      "History",
      "Home Science",
      "Hotel Management",
      "HR/Industrial Relations",
      "Immunology",
      "Instrumentation",
      "International Business",
      "Journalism",
      "Law",
      "Linguistics",
      "Marine",
      "Marketing",
      "Maths",
      "Mechnical",
      "Medicine",
      "Metallurgy",
      "Microbiology",
      "Mineral Mining",
      "Music",
      "Neonatal",
      "Nuclear",
      "Nursing",
      "Obstetrics",
      "Other Arts",
      "Other Doctorate",
      "Other Engineering",
      "Other Management",
      "Other Science",
      "Paint/Oil",
      "Pathalogy",
      "Pediatrics",
      "Petroleum",
      "Pharmacy",
      "Philosophy",
      "Physical",
      "Education",
      "Physics",
      "Plastics",
      "Political Science",
      "Production/Industrial",
      "Psychiatry",
      "Psychology",
      "Radiology",
      "Sanskrit",
      "Sociology",
      "Special Education",
      "Statistics",
      "Systems",
      "Textile",
      "Vocational Courses",
      "Zoology",
      "Others"
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "MS/M.Sc(Science)",
    "specialization": [
      "Aerospace & Mechanical Engineering",
      "Agriculture",
      "Anthropology",
      "Astronautical Engineering",
      "Bio-Chemistry",
      "Biology",
      "Bio-Technology",
      "Botany",
      "Chemical-Engineering & Material Science",
      "Chemistry",
      "Civil &Environmental Engineering",
      "Computers",
      "Cyber Sceurity Engineering",
      "Dairy Technology",
      "Data Informatics",
      "Electrical Engineering",
      "Electronics",
      "Electronics & Embeded Technology",
      "Environmental Science",
      "Food Technology",
      "Geology",
      "Home Science",
      "Hospitality Administration",
      "Industrial system and Engineering",
      "Marine Engineering",
      "Maths",
      "Mechanical Engineering",
      "Mechatronics",
      "Microbiology",
      "Nursing",
      "Optometry",
      "Organic Chemistry",
      "Petroleum Engineering",
      "Physics",
      "Statistics",
      "System Architecture & Engineering",
      "Veterinary Science",
      "Zoology",
      "Other"
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "MBA/PGDM",
    "specialization": [
      "Advertising/Mass Communication",
      "Finance",
      "Hospitality Management",
      "HR/Industrial Relations",
      "Information Technology",
      "International Business",
      "Marketing",
      "Operations",
      "Other Management",
      "Systems",
      "Other"
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "M.A.",
    "specialization": [
      "Anthropology",
      "Arts & Humanities",
      "Communication",
      "Economics",
      "English",
      "Films",
      "Fine Arts",
      "Hindi",
      "History",
      "Journalism",
      "Maths",
      "Political Science",
      "PR/Advertising",
      "Psychology",
      "Sanskrit",
      "Sociology",
      "Statistics",
      "Others"
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "M.Com",
    "specialization": [
      "Commerce",
      "Others"
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "MCA",
    "specialization": [
      "Computers",
      "Others"
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "M.Tech",
    "specialization": [
      "Agriculture",
      "Automobile",
      "Aviation",
      "Bio-Chemistry/Bio-Technology",
      "Biomedical",
      "Ceramics",
      "Chemical",
      "Civil",
      "Computers",
      "Electrical",
      "Electronics /Telecommunication",
      "Energy",
      "Environmental",
      "Instrumentation",
      "Marine",
      "Mechanical",
      "Metallurgy",
      "Mineral",
      "Mining",
      "Nuclear",
      "Other Engineering",
      "Paint/Oil",
      "Petroleum",
      "Plastics",
      "Production/Industrial",
      "Textile",
      "Other"
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "Integrated PG",
    "specialization": [
      "Journalism/Mass Communication",
      "Management",
      "PR/Advertising",
      "Tourism",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "CA",
    "specialization": [
      "CA",
      "First Attempt",
      "Pursuing",
      "Second Attempt",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "CS",
    "specialization": [
      "CS",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "DM",
    "specialization": [
      "Cardiac-Anaes",
      "Cardiology",
      "Child & Adolescent Psychiatry",
      "Clinical Haematology",
      "Clinical Immunology",
      "Clinical Pharmacology",
      "Critical Care Medicine",
      "Endocrinology",
      "Gastroenterology",
      "Geriatric Mental Health",
      "Haematology Pathology",
      "Hepatology",
      "Immunology",
      "Infectious Diseases",
      "Medical Geentics",
      "Neonatology",
      "Nephrology",
      "Neuro Anaesthesia",
      "Neuro Radiology",
      "Neurology",
      "Oncology",
      "Organ Transplant Anaesthesia & Critical Care",
      "Pediatric Anaesthesia",
      "Pediatric Cardiology",
      "Pediatric Gastroenterology",
      "Pediatric Hepatology",
      "Pediatric Nephrology",
      "Pediatric Oncology",
      "Pulmonary Med. & Critical Care Med",
      "Pulmonary Medicine",
      "Reproductive Medicine",
      "Rheumatology",
      "Virology",
      "Other"
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "ICWA(CMA)",
    "specialization": [
      "ICWA(CMA)",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "LLM",
    "specialization": [
      "Law",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "M.Arch",
    "specialization": [
      "Architecture",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "M.Ch",
    "specialization": [
      "Burns & Plastic Surgery",
      "Cardio Thoraic and Vascular Surgery",
      "Cardio Thoraic Surgery",
      "Endocrine Surgery",
      "Gynaecological Oncology",
      "Hand & Micro Surgery",
      "Hand Surgery",
      "Hepato Pancreato Biliary Surgery",
      "Neuro Surgery",
      "Oncology",
      "Pediatric Cardio-Thoraic and Vascular Surgery",
      "Pediatric Surgery",
      "Plastic & Reconstructive Surgery",
      "Plastic Surgery",
      "Surgical Gastroenterology/G.I. Surgery",
      "Surgical Oncology",
      "Thoraic Surgery",
      "Urology",
      "Urology/Genito-Urinary Surgery",
      "Vascular Surgery",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "M.Des.",
    "specialization": [
      "Animation Film Design",
      "Apparel Design",
      "Ceremics & Glass Design",
      "Design For Retail Expirience",
      "Digital Game Design",
      "Film and Video Communication",
      "Furniture Design",
      "Graphic Design",
      "Information Design",
      "Interaction Design",
      "Lifestyle Accessory Design",
      "New Media Design",
      "Photography Design",
      "Product Design",
      "Stratergic Design Management",
      "Textile Design",
      "Toy & Game Design",
      "Transportation & Automobile Design",
      "Universal Design",
      "Other"
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "M.Ed",
    "specialization": [
      "Education",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "M.Pharma",
    "specialization": [
      "Pharmacy",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "MCM",
    "specialization": [
      "Computer & Management",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "MDS",
    "specialization": [
      "Dentistry",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "MFA",
    "specialization": [
      "Paintmaking",
      "Sculpture",
      "Visual Communication",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "Medical-MS/MD",
    "specialization": [
      "Anaesthesiology",
      "Anatomy",
      "Aviation Medicine/Aerospace Medicine",
      "Ayurveda",
      "Bio-Chemistry",
      "Bio-Physics",
      "Blood Banking & Immuno. Haem./Imm.Haem. & Blood Trans.",
      "Cardiology",
      "CCM",
      "Dermatology",
      "Emergency Medicine",
      "ENT",
      "Forensic Medicine/Forensic Medicine & Toxicology",
      "General Practictioner",
      "General Surgery",
      "Geriatrics",
      "Gyneocology",
      "Health Administration",
      "Hepatology",
      "Hospital Administration",
      "Immunology",
      "Lab Medicine",
      "Maternity & Child Health",
      "Medical Genetics",
      "Microbiology",
      "Neonatal",
      "Nephrology",
      "Neuro Surgery",
      "Nuclear Medicine",
      "Obstretrics",
      "Oncology",
      "Orthopaedic",
      "P.S.M.",
      "Palliative Medicine",
      "Pathology",
      "Pediatrics",
      "Pharmacology",
      "Physical Medicine & Rehabillation",
      "Psychiatry",
      "Psychology",
      "Public Health (Epidemiology)",
      "Pulmonary Medicine",
      "R&D",
      "Radiology",
      "Radiotherapy",
      "Rheumatology",
      "Social & Preventive Medicine/Community Medicine",
      "Sports Medicine",
      "Throcic Medicine",
      "Traumatology & Surgery",
      "Tropical Medicine",
      "Tuberculosis & Respiratory Disease/Pulmonary Medicine",
      "Unani",
      "Urology",
      "Venereology",
      "Other"
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "MVSC",
    "specialization": [
      "Veternary Science",
      "Other",
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "PG Diploma",
    "specialization": [
      "Chemical",
      "Civil",
      "Computers",
      "Electrical",
      "Electronics",
      "Mechanical",
      "Other"
    ]
  },
  {
    "education": "Masters/Post-Graduation",
    "course": "Other",
    "specialization": ["Please Enter your Course"]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.Tech/B.E.",
    "specialization": [
      "Agriculture",
      "Automobile",
      "Aviation",
      "Bio-Chemistry/Bio-Technology",
      "Ceramics",
      "Chemical",
      "Civil",
      "Computers",
      "Electrical",
      "Electronics/Telecommunication",
      "Energy",
      "Environmental",
      "Instruementation",
      "Marine",
      "Mechanical",
      "Metallurgy",
      "Mineral",
      "Mining",
      "Nuclear",
      "Paint/Oil",
      "Petroleum",
      "Plastics",
      "Production/Industrial",
      "Textile",
      "Other Engineering",
      "Other"
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.Com",
    "specialization": [
      "Commerce",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.Sc",
    "specialization": [
      "Agriculture",
      "Anthropology",
      "Bio-Chemistry",
      "Biology",
      "Botany",
      "Chemistry",
      "Computers",
      "Dairy Technology",
      "Electronics",
      "Environmental Science",
      "Food Technology",
      "General",
      "Geology",
      "Home Science",
      "Hospitality & Hotel Management",
      "Maths",
      "Microbiology",
      "Nursing",
      "Optometry",
      "Physics",
      "Statistics",
      "Zoology",
      "Other"
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.A",
    "specialization": [
      "Arts&Humanities",
      "Communication",
      "Economics",
      "English",
      "Film",
      "Fine Arts",
      "Hindi",
      "History",
      "Hotel Management",
      "Journalism",
      "Maths",
      "Pass Course",
      "Political Science",
      "PR/Advertising",
      "Psychology",
      "Sanskrit",
      "Sociology",
      "Statistics",
      "Vocational Courses",
      "Other"
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "Diploma",
    "specialization": [
      "Architecuture",
      "Chemical",
      "Civil",
      "Computers",
      "Electrical",
      "Electronics/Telecommunications",
      "Engineering",
      "Export/Import",
      "Fshion Designing/Other Designing",
      "Graphic/Web Designing",
      "Hotel Management",
      "Insurance",
      "Management",
      "Mechanical",
      "Tourism",
      "Visual Arts",
      "Vocational Course",
      "Other"
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.B.A/B.M.S",
    "specialization": [
      "Management",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.C.A.",
    "specialization": [
      "Computers",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.Arch",
    "specialization": [
      "Architecture",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.Des.",
    "specialization": [
      "Animation Film Design",
      "Ceramic & Glass Design",
      "Exhibition Design",
      "Film and Video Communication",
      "Furniture Design",
      "Graphic Design",
      "Product Design",
      "Textile Design",
      "Other"
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.Ed",
    "specialization": [
      "Education",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.EI.Ed",
    "specialization": [
      "Elementary Education",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.P.Ed",
    "specialization": [
      "Physical Education",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.Pharma",
    "specialization": [
      "Pharmacy",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "B.U.M.S",
    "specialization": [
      "Unani Medicine",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "BAMS",
    "specialization": [
      "Ayurveda",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "BDS",
    "specialization": [
      "Dentistry",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "BFA",
    "specialization": [
      "Art History",
      "Painting",
      "Printmaking",
      "Sculpture",
      "Visual Communication",
      "Other"
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "BHM",
    "specialization": [
      "Hotel Management",
      "Other"
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "BHMS",
    "specialization": [
      "Homeopathy",
      "Other"
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "BVSC",
    "specialization": [
      "Veternary Science",
      "Other"
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "LLB",
    "specialization": [
      "Law",
      "Other",
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "MBBS",
    "specialization": [
      "Medicine",
      "Other"
    ]
  },
  {
    "education": "Graduation/Diploma",
    "course": "Other",
    "specialization": ["Others"
    ]
  },
  {
    "education": "12th",
    "course": [
      "CBSE",
      "CISCE(ICSE/ISC)",
      "Diploma",
      "National Open School",
      "IB(International Baccalaureate)",
      "Andhra Pradesh",
      "Assam",
      "Bihar",
      "Goa",
      "Gujrat",
      "Haryana",
      "Himachal Pradesh",
      "J & K",
      "Karnataka",
      "Kerala",
      "Maharashtra",
      "Madhya Pradesh",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Orissa",
      "Punjab",
      "Rajasthan",
      "Tamil Nadu",
      "Tripura",
      "Uttar Pradesh",
      "West Bengal",
      "Other"
    ],
    "specialization": [
      "Assamese/Asomiya",
      "Bengali/Bangla",
      "English",
      "Gujrati",
      "Hindi",
      "Kannada",
      "Kashmiri",
      "Konkani",
      "Malayalam",
      "Manipuri",
      "Marathi",
      "Oriya",
      "Punjabi",
      "Sanskrit",
      "Tamil",
      "Telugu",
      "Urdu",
      "Other"
    ]
  },
  {
    "education": "10th",
    "course": [
      "CBSE",
      "CISCE(ICSE/ISC)",
      "Diploma",
      "National Open School",
      "IB(International Baccalaureate)",
      "Andhra Pradesh",
      "Assam",
      "Bihar",
      "Goa",
      "Gujrat",
      "Haryana",
      "Himachal Pradesh",
      "J & K",
      "Karnataka",
      "Kerala",
      "Maharashtra",
      "Madhya Pradesh",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Orissa",
      "Punjab",
      "Rajasthan",
      "Tamil Nadu",
      "Tripura",
      "Uttar Pradesh",
      "West Bengal",
      "Other"
    ],
    "specialization": [
      "Assamese/Asomiya",
      "Bengali/Bangla",
      "English",
      "Gujrati",
      "Hindi",
      "Kannada",
      "Kashmiri",
      "Konkani",
      "Malayalam",
      "Manipuri",
      "Marathi",
      "Oriya",
      "Punjabi",
      "Sanskrit",
      "Tamil",
      "Telugu",
      "Urdu",
      "Other"
    ]
  }
  ]
}

