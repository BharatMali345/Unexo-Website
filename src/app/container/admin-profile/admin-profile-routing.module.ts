import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProfileComponent } from './admin-profile.component';
import { HrListComponent } from './hr-list/hr-list.component';
import { ViewAdminProfileComponent } from './view-admin-profile/view-admin-profile.component';


const routes: Routes = [
  {
    path: '', component: AdminProfileComponent, children: [
      { path: '', component: ViewAdminProfileComponent },
      { path: 'hr-list', component: HrListComponent },

      // { path: 'education', component: EducationDetailsComponent },
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
export class AdminProfileRoutingModule { }
