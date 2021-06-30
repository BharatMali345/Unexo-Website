import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../home/auth.service';
import { Job } from './apply-jobs/job.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http: HttpClient, private authservice: AuthService) { }
  // getAllJobs(): Observable<Job[]> {

  //   return this.http.get(environment.baseUrl + '/getalljobs/' + this.authservice.userid(), this.httpOptions).pipe(map(data => <Job[]>data));
  // }
  getAllJobs(event): Observable<any> {
    return this.http.post(environment.baseUrl + '/getalljobs/' + this.authservice.userid(), event).pipe(map(data => <any>data));
  }

  getJobDetails(jobId) {
    return this.http.get<any>(environment.baseUrl + '/getjobdetails/' + jobId + '/' + this.authservice.userid(), this.httpOptions);
  }

  applyJob(jobId) {
    return this.http.post(environment.baseUrl + '/applyjob/', JSON.stringify({ "userId": this.authservice.userid(), "jobId": jobId }), this.httpOptions);

  }

  getMyAppliedJobDetails(event): Observable<Job> {
    return this.http.post<any>(environment.baseUrl + '/getmyappliedjobdetails/' + this.authservice.userid(), event).pipe(map(data => <Job>data));
  }

  getUserNotifications() {
    return this.http.post(environment.baseUrl + '/getusernotifications/' + this.authservice.userid(), this.httpOptions);

  }
}
