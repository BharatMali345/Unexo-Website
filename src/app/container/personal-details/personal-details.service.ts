import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../home/auth.service';
import { Router } from '@angular/router';
import { EducationData } from '../user-profile/profile-education-detail/educationdata.model';
import { EmployerData } from '../user-profile/profile-employer-detail/employer.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {
  userid: string;
  private _refreshNeeded$ = new Subject<void>();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http: HttpClient, private authservice: AuthService, private router: Router) { }


  addPsData(psdata) {
    return this.http.post(environment.baseUrl + '/personaldetails/', psdata).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }


  addEducationalDetails(edData) {
    return this.http.post(environment.baseUrl + '/educationaldetails/', edData).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }


  addWorkExperience(wdData) {
    return this.http.post(environment.baseUrl + '/workdetails/', wdData).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }


  addEmployerDetails(emData) {
    return this.http.post(environment.baseUrl + '/employerdetails/', emData).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }


  addFamilyDetails(fdData) {
    return this.http.post(environment.baseUrl + '/familydetails/', fdData).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }


  addBankDetails(bdData) {
    return this.http.post(environment.baseUrl + '/bankdetails/', bdData).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }


  uploadDocuments(dData) {
    return this.http.post(environment.baseUrl + '/uploaddocuments/', dData).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }


  completeRegistration(cData) {
    return this.http.post(environment.baseUrl + '/completeregistration/', cData).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }


  getUserStatus() {
    this.userid = this.authservice.userid();
    return this.http.post<any>(environment.baseUrl + '/userstatus/', JSON.stringify({ "userId": this.userid }), this.httpOptions);
  }


  getUserPhoneNo() {
    this.userid = this.authservice.userid();
    return this.http.post<any>(environment.baseUrl + '/userphoneno/', JSON.stringify({ "userId": this.userid }), this.httpOptions);
  }


  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


  editMode() {
    return !!localStorage.getItem('editMode');
  }


  getPersonalDetailsData() {
    return this.http.get(environment.baseUrl + '/getpersonaldetails/' + this.authservice.userid());
  }


  getEducationalDetailsData(): Observable<EducationData> {
    return this.http.get(environment.baseUrl + '/geteducationaldetails/' + this.authservice.userid()).pipe(map(data => <EducationData>data));
  }


  getWorkDetailsData() {
    return this.http.get(environment.baseUrl + '/getworkdetails/' + this.authservice.userid());
  }


  getEmployerDetailsData(): Observable<EmployerData> {
    return this.http.get(environment.baseUrl + '/getemployerdetails/' + this.authservice.userid()).pipe(map(data => <EmployerData>data));
  }


  getFamilyDetailsData() {
    return this.http.get(environment.baseUrl + '/getfamilydetails/' + this.authservice.userid());
  }


  getBankDetailsData() {
    return this.http.get(environment.baseUrl + '/getbankdetails/' + this.authservice.userid());
  }


  getDocumentDetailsData() {
    return this.http.get(environment.baseUrl + '/getdocumentsdetails/' + this.authservice.userid());
  }


  enableEditMode() {
    localStorage.setItem('editMode', 'true');
  }


  cancelEditMode() {
    localStorage.removeItem('editMode');
    this.router.navigate(['/user-profile']);
  }

  getDistricts(stateCode) {
    return this.http.post<any>(environment.baseUrl + '/getdistricts/', JSON.stringify({ "stateCode": stateCode }), this.httpOptions);
  }

  getSubIndustry(industry) {
    return this.http.post<any>(environment.baseUrl + '/getsubindustry/', JSON.stringify({ "industryName": industry }), this.httpOptions);
  }

  states = [
    {
      "key": "1",
      "name": "JAMMU AND KASHMIR"
    },
    {
      "key": "2",
      "name": "HIMACHAL PRADESH"
    },
    {
      "key": "3",
      "name": "PUNJAB"
    },
    {
      "key": "4",
      "name": "CHANDIGARH"
    },
    {
      "key": "5",
      "name": "UTTARAKHAND"
    },
    {
      "key": "6",
      "name": "HARYANA"
    },
    {
      "key": "7",
      "name": "DELHI"
    },
    {
      "key": "8",
      "name": "RAJASTHAN"
    },
    {
      "key": "9",
      "name": "UTTAR PRADESH"
    },
    {
      "key": "10",
      "name": "BIHAR"
    },
    {
      "key": "11",
      "name": "SIKKIM"
    },
    {
      "key": "12",
      "name": "ARUNACHAL PRADESH"
    },
    {
      "key": "13",
      "name": "NAGALAND"
    },
    {
      "key": "14",
      "name": "MANIPUR"
    },
    {
      "key": "15",
      "name": "MIZORAM"
    },
    {
      "key": "16",
      "name": "TRIPURA"
    },
    {
      "key": "17",
      "name": "MEGHALAYA"
    },
    {
      "key": "18",
      "name": "ASSAM"
    },
    {
      "key": "19",
      "name": "WEST BENGAL"
    },
    {
      "key": "20",
      "name": "JHARKHAND"
    },
    {
      "key": "21",
      "name": "ORISSA"
    },
    {
      "key": "22",
      "name": "CHHATTISGARH"
    },
    {
      "key": "23",
      "name": "MADHYA PRADESH"
    },
    {
      "key": "24",
      "name": "GUJARAT"
    },
    {
      "key": "25",
      "name": "DAMAN AND DIU"
    },
    {
      "key": "26",
      "name": "DADAR AND NAGAR HAVELI"
    },
    {
      "key": "27",
      "name": "MAHARASHTRA"
    },
    {
      "key": "29",
      "name": "KARNATAKA"
    },
    {
      "key": "30",
      "name": "GOA"
    },
    {
      "key": "31",
      "name": "LAKSHADWEEP"
    },
    {
      "key": "32",
      "name": "KERALA"
    },
    {
      "key": "33",
      "name": "TAMIL NADU"
    },
    {
      "key": "34",
      "name": "PUDUCHERRY"
    },
    {
      "key": "35",
      "name": "ANDAMAN AND NICOBAR"
    },
    {
      "key": "36",
      "name": "TELANGANA"
    },
    {
      "key": "37",
      "name": "ANDHRA PRADESH"
    },
    {
      "key": "97",
      "name": "OTHER TERRITORY"
    },
    {
      "key": "96",
      "name": "OTHER COUNTRY"
    }
  ];
}
