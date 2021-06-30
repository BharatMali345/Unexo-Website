import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { ProfilePersonalDetailComponent } from './profile-personal-detail/profile-personal-detail.component';
import { ProfileEducationDetailComponent } from './profile-education-detail/profile-education-detail.component';
import { ProfileWorkDetailComponent } from './profile-work-detail/profile-work-detail.component';
import { ProfileEmployerDetailComponent } from './profile-employer-detail/profile-employer-detail.component';
import { ProfileFamilyDetailComponent } from './profile-family-detail/profile-family-detail.component';
import { ProfileBankDetailComponent } from './profile-bank-detail/profile-bank-detail.component';
import { ProfileDocumentsDetailComponent } from './profile-documents-detail/profile-documents-detail.component';
import { SharedModule } from 'src/app/components/shared.module';
import { MaterialModule } from 'src/app/components/material/material.module';
import { ApplyJobsComponent } from './apply-jobs/apply-jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MyAppliedJobsComponent } from './my-applied-jobs/my-applied-jobs.component';
import { UserNotificationsComponent } from './user-notifications/user-notifications.component';

@NgModule({
  declarations: [UserProfileComponent, ProfilePersonalDetailComponent, ProfileEducationDetailComponent, ProfileWorkDetailComponent, ProfileEmployerDetailComponent, ProfileFamilyDetailComponent, ProfileBankDetailComponent, ProfileDocumentsDetailComponent, ApplyJobsComponent, JobDetailsComponent, MyAppliedJobsComponent, UserNotificationsComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class UserProfileModule { }
