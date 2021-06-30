import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { AdminProfileComponent } from './admin-profile.component';
import { ViewAdminProfileComponent } from './view-admin-profile/view-admin-profile.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SharedModule } from 'src/app/components/shared.module';
import { MaterialModule } from 'src/app/components/material/material.module';
import { HrListComponent } from './hr-list/hr-list.component';


@NgModule({
  declarations: [AdminProfileComponent, ViewAdminProfileComponent, SafeHtmlPipe, HrListComponent],
  imports: [
    CommonModule,
    AdminProfileRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdminProfileModule { }
