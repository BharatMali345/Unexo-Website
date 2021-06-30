import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http: HttpClient) { }

  getUsers(event) {
    return this.http.post(environment.baseUrl + '/getusers/', event);
  }

  getUsersExcel() {
    return this.http.get(environment.baseUrl + '/getusersexcel/');
  }

  getUsersHr(event) {
    return this.http.post(environment.baseUrl + '/getusershr/', event);
  }

  getUsersExcelHr() {
    return this.http.get(environment.baseUrl + '/getusersexcelhr/');
  }

  deleteUser(userid) {
    return this.http.post(environment.baseUrl + '/deleteuser/' + userid, this.httpOptions);
  }
}
