import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../home/auth.service';
import { EmployerData } from '../user-profile/profile-employer-detail/employer.model';

@Injectable({
  providedIn: 'root'
})
export class HrProfileService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private _refreshNeeded$ = new Subject<void>();

  constructor(private authservice: AuthService, private http: HttpClient) { }


  addHrData(hrdata) {
    return this.http.post(environment.baseUrl + '/hrdetails/', hrdata);
    // .pipe(
    //   tap(() => {
    //     this._refreshNeeded$.next();
    //   })
    // );
  }

  postJob(jdata) {
    return this.http.post(environment.baseUrl + '/postjob/', jdata);
    // .pipe(
    //   tap(() => {
    //     this._refreshNeeded$.next();
    //   })
    // );
  }

  getHrDetailsData() {
    return this.http.get(environment.baseUrl + '/gethrdetails/' + this.authservice.userid());
  }

  getPostedJobs(event) {
    return this.http.post(environment.baseUrl + '/getmypostedjobs/' + this.authservice.userid(), event);
  }
  getAppliedUsers(jobid, event) {
    return this.http.post(environment.baseUrl + '/getjobappliedusers/' + jobid, event);
  }
  deleteJob(jobId) {
    return this.http.post(environment.baseUrl + '/deletejob/', JSON.stringify({ "jobId": jobId }), this.httpOptions);
  }

  getEmployerDetailsData(userid): Observable<EmployerData> {
    return this.http.get(environment.baseUrl + '/getemployerdetails/' + userid).pipe(map(data => <EmployerData>data));
  }

  viewedProfileNotification(jobid, candidateid) {
    return this.http.get(environment.baseUrl + '/viewedprofilenotification/' + jobid + '/' + this.authservice.userid() + '/' + candidateid);
  }
  jobApprovalStatus(jobid, candidateid, status) {
    return this.http.get(environment.baseUrl + '/jobapprovalstatus/' + jobid + '/' + this.authservice.userid() + '/' + candidateid + '/' + status);
  }
}
