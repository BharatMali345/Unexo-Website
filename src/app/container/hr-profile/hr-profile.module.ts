import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrProfileRoutingModule } from './hr-profile-routing.module';
import { HrProfileComponent } from './hr-profile.component';
import { HrHomeComponent } from './hr-home/hr-home.component';
import { MaterialModule } from 'src/app/components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { PostJobComponent } from './post-job/post-job.component';
import { ViewPostedJobsComponent } from './view-posted-jobs/view-posted-jobs.component';
import { AppliedUsersComponent } from './applied-users/applied-users.component';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { HrNotificationsComponent } from './hr-notifications/hr-notifications.component';


@NgModule({
  declarations: [HrProfileComponent, HrHomeComponent, PostJobComponent, ViewPostedJobsComponent, AppliedUsersComponent, EmployerDetailsComponent, HrNotificationsComponent],
  imports: [
    CommonModule,
    HrProfileRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class HrProfileModule { }
