import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ApplyJobsComponent } from './apply-jobs/apply-jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MyAppliedJobsComponent } from './my-applied-jobs/my-applied-jobs.component';
import { ProfileBankDetailComponent } from './profile-bank-detail/profile-bank-detail.component';
import { ProfileDocumentsDetailComponent } from './profile-documents-detail/profile-documents-detail.component';
import { ProfileEducationDetailComponent } from './profile-education-detail/profile-education-detail.component';
import { ProfileEmployerDetailComponent } from './profile-employer-detail/profile-employer-detail.component';
import { ProfileFamilyDetailComponent } from './profile-family-detail/profile-family-detail.component';
import { ProfilePersonalDetailComponent } from './profile-personal-detail/profile-personal-detail.component';
import { ProfileWorkDetailComponent } from './profile-work-detail/profile-work-detail.component';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';
import { UserProfileComponent } from './user-profile.component';


const routes: Routes = [
  {
    path: '', component: UserProfileComponent, children: [
      { path: '', component: ProfilePersonalDetailComponent },
      { path: 'profile-education', component: ProfileEducationDetailComponent },
      { path: 'profile-work', component: ProfileWorkDetailComponent },
      { path: 'profile-employer', component: ProfileEmployerDetailComponent },
      { path: 'profile-family', component: ProfileFamilyDetailComponent },
      { path: 'profile-documents', component: ProfileDocumentsDetailComponent },
      { path: 'profile-bank', component: ProfileBankDetailComponent },
      { path: 'apply-jobs', component: ApplyJobsComponent },
      { path: 'job-details/:jobId', component: JobDetailsComponent },
      { path: 'my-applied-jobs', component: MyAppliedJobsComponent },
      { path: 'user-notifications', component: UserNotificationsComponent },



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
