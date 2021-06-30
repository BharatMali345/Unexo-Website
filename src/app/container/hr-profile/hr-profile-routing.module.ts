import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppliedUsersComponent } from './applied-users/applied-users.component';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { HrHomeComponent } from './hr-home/hr-home.component';
import { HrNotificationsComponent } from './hr-notifications/hr-notifications.component';
import { HrProfileComponent } from './hr-profile.component';
import { PostJobComponent } from './post-job/post-job.component';
import { ViewPostedJobsComponent } from './view-posted-jobs/view-posted-jobs.component';


const routes: Routes = [
  {
    path: '', component: HrProfileComponent, children: [
      { path: '', component: PostJobComponent },
      { path: 'details', component: HrHomeComponent },
      { path: 'posted-jobs', component: ViewPostedJobsComponent },
      { path: 'applied-users/:jobId/:jobName', component: AppliedUsersComponent },
      { path: 'employer-details/:userId/:jobid', component: EmployerDetailsComponent },
      { path: 'hr-notifications', component: HrNotificationsComponent },


      // { path: 'work', component: WorkDetailsComponent },
      // { path: 'employer', component: EmployerComponent },
      // { path: 'family', component: FamilyComponent },
      // { path: 'documents', component: DocumentsComponent },
      // { path: 'bank', component: BankComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrProfileRoutingModule { }
