import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonalDetailsRoutingModule } from './personal-details-routing.module';
import { PersonalDetailsComponent } from './personal-details.component';
import { PersonalDetailPageComponent } from './personal-detail-page/personal-detail-page.component';
import { EducationDetailsComponent } from './education-details/education-details.component';
import { WorkDetailsComponent } from './work-details/work-details.component';
import { EmployerComponent } from './employer/employer.component';
import { FamilyComponent } from './family/family.component';
import { DocumentsComponent } from './documents/documents.component';
import { BankComponent } from './bank/bank.component';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [PersonalDetailsComponent, PersonalDetailPageComponent, EducationDetailsComponent, WorkDetailsComponent, EmployerComponent, FamilyComponent, DocumentsComponent, BankComponent],
  imports: [
    CommonModule,
    PersonalDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PersonalDetailsModule { }
