import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankComponent } from './bank/bank.component';
import { DocumentsComponent } from './documents/documents.component';
import { EducationDetailsComponent } from './education-details/education-details.component';
import { EmployerComponent } from './employer/employer.component';
import { FamilyComponent } from './family/family.component';
import { PersonalDetailPageComponent } from './personal-detail-page/personal-detail-page.component';
import { PersonalDetailsComponent } from './personal-details.component';
import { WorkDetailsComponent } from './work-details/work-details.component';


const routes: Routes = [
  {
    path: '', component: PersonalDetailsComponent, children: [
      { path: '', component: PersonalDetailPageComponent },
      { path: 'education', component: EducationDetailsComponent },
      { path: 'work', component: WorkDetailsComponent },
      { path: 'employer', component: EmployerComponent },
      { path: 'family', component: FamilyComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'bank', component: BankComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalDetailsRoutingModule { }
