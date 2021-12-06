import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RecaptchaModule } from "ng-recaptcha";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./container/home/home.component";
import { OpportunityComponent } from "./container/opportunity/opportunity.component";
import { CorporateComponent } from "./container/corporate/corporate.component";
import { WhoWeAreComponent } from "./container/who-we-are/who-we-are.component";
import { WhatWeDoComponent } from "./container/what-we-do/what-we-do.component";
import { WhyJoinUnexoComponent } from "./container/why-join-unexo/why-join-unexo.component";
import { CultureComponent } from "./container/culture/culture.component";
import { TrainingComponent } from "./container/training/training.component";
import { SkillDevelopmentComponent } from "./container/skill-development/skill-development.component";
import { ConsultingComponent } from "./container/consulting/consulting.component";
import { FundsRaisingComponent } from "./container/funds-raising/funds-raising.component";
import { MergerComponent } from "./container/merger/merger.component";
import { GlobalComponent } from "./container/global/global.component";
import { NotifierModule } from "angular-notifier";
import { TokenInterceptorService } from "./container/home/token-interceptor.service";
import { SharedModule } from "./components/shared.module";
import { ForgotPasswordComponent } from "./container/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./container/verify-email/verify-email.component";
import { VerifyMobileComponent } from "./container/verify-mobile/verify-mobile.component";
import { AdminLoginComponent } from "./container/admin-login/admin-login.component";
import { HrLoginComponent } from "./container/hr-login/hr-login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VisionComponent } from "./container/vision/vision.component";
import { AgmCoreModule } from "@agm/core";
declare const google: any;
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    OpportunityComponent,
    CorporateComponent,
    WhoWeAreComponent,
    WhatWeDoComponent,
    WhyJoinUnexoComponent,
    CultureComponent,
    TrainingComponent,
    SkillDevelopmentComponent,
    ConsultingComponent,
    FundsRaisingComponent,
    MergerComponent,
    GlobalComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    VerifyMobileComponent,
    AdminLoginComponent,
    HrLoginComponent,
    VisionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RecaptchaModule,
    HttpClientModule,
    NotifierModule,
    SharedModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBDDGF7krvFErR0sp4jTakpcJjWt99isZg",
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
