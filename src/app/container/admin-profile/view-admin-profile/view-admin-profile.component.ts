import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NotifierService } from 'angular-notifier';
import { AdminProfileService } from '../admin-profile.service';

@Component({
  selector: 'app-view-admin-profile',
  templateUrl: './view-admin-profile.component.html',
  styleUrls: ['./view-admin-profile.component.css']
})
export class ViewAdminProfileComponent implements OnInit {
  userData;
  excel;
  filepath;
  isLoading = false;
  pageEvent: PageEvent;
  public dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private adminProfileService: AdminProfileService, private notifierservice: NotifierService) { }

  ngOnInit(): void {
    this.getUserData(null);
    this.getUserExcelData();
  }

  getUserData(event?: PageEvent) {
    this.isLoading = true;
    this.adminProfileService.getUsers(event).subscribe((response: any) => {
      this.userData = response.data;
      this.currentPage = response.pageIndex;
      this.pageSize = response.pageSize;
      this.totalSize = response.totalSize;
      document.body.scrollTop = 0;
      this.isLoading = false;

    },
      error => {
        this.isLoading = false;

      });
    return event;
  }

  getUserExcelData() {
    this.isLoading = true;
    this.adminProfileService.getUsersExcel().subscribe(response => {
      this.excel = response;
      this.filepath = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + this.excel.file;
      this.isLoading = false;

    },
      error => {
        this.isLoading = false;

      })
  }

  deleteUser(userid) {
    if (confirm('Are You Sure You Want to Remove the Account?')) {
      this.adminProfileService.deleteUser(userid).subscribe(response => {
        this.notifierservice.notify('success', 'Deleted Successfully!');
        this.ngOnInit();
      }, error => {
        this.notifierservice.notify('error', error.error.status);
      });
    }

  }
}
