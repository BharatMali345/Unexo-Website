import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AdminLoginComponent } from "./container/admin-login/admin-login.component";
import { AdminLoginGuard } from "./container/admin-login/admin-login.guard";
import { ConsultingComponent } from "./container/consulting/consulting.component";
import { CorporateComponent } from "./container/corporate/corporate.component";
import { CultureComponent } from "./container/culture/culture.component";
import { ForgotPasswordComponent } from "./container/forgot-password/forgot-password.component";
import { FundsRaisingComponent } from "./container/funds-raising/funds-raising.component";
import { GlobalComponent } from "./container/global/global.component";
import { AuthGuard } from "./container/home/auth.guard";
import { HomeComponent } from "./container/home/home.component";
import { HrLoginComponent } from "./container/hr-login/hr-login.component";
import { HrGuard } from "./container/hr-login/hr.guard";
import { MergerComponent } from "./container/merger/merger.component";
import { OpportunityComponent } from "./container/opportunity/opportunity.component";
import { SkillDevelopmentComponent } from "./container/skill-development/skill-development.component";
import { TrainingComponent } from "./container/training/training.component";
import { VerifyEmailComponent } from "./container/verify-email/verify-email.component";
import { VerifyMobileComponent } from "./container/verify-mobile/verify-mobile.component";
import { VisionComponent } from "./container/vision/vision.component";
import { WhatWeDoComponent } from "./container/what-we-do/what-we-do.component";
import { WhoWeAreComponent } from "./container/who-we-are/who-we-are.component";
import { WhyJoinUnexoComponent } from "./container/why-join-unexo/why-join-unexo.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "about", component: OpportunityComponent },
  { path: "vision", component: VisionComponent },
  { path: "solutions", component: CorporateComponent },
  { path: "who-we-are", component: WhoWeAreComponent },
  { path: "what-we-do", component: WhatWeDoComponent },
  { path: "why-join-unexo", component: WhyJoinUnexoComponent },
  { path: "career", component: CultureComponent },
  { path: "training", component: TrainingComponent },
  { path: "skill-development", component: SkillDevelopmentComponent },
  { path: "platform", component: ConsultingComponent },
  { path: "location", component: FundsRaisingComponent },
  { path: "merger", component: MergerComponent },
  { path: "project", component: GlobalComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "verify-email", component: VerifyEmailComponent },
  { path: "verify-mobile", component: VerifyMobileComponent },
  { path: "admin_login", component: AdminLoginComponent },
  { path: "hr-login", component: HrLoginComponent },
  {
    path: "personal-details",
    loadChildren: () =>
      import("./container/personal-details/personal-details.module").then(
        (m) => m.PersonalDetailsModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: "user-profile",
    loadChildren: () =>
      import("./container/user-profile/user-profile.module").then(
        (m) => m.UserProfileModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: "admin-profile",
    loadChildren: () =>
      import("./container/admin-profile/admin-profile.module").then(
        (m) => m.AdminProfileModule
      ),
    // canActivate: [AdminLoginGuard],
  },
  {
    path: "hr-profile",
    loadChildren: () =>
      import("./container/hr-profile/hr-profile.module").then(
        (m) => m.HrProfileModule
      ),
    // canActivate: [HrGuard],
  },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
