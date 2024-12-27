import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavgationComponent } from './navgation/navgation.component';
import { AccountTypeComponent } from './account-type/account-type.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AccountsLinkComponent } from './accounts-link/accounts-link.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { SkillsComponent } from './skills/skills.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProjectsComponent } from './projects/projects.component';
import { CommunityComponent } from './community/community.component';
import { CommunityHeaderComponent } from './community-header/community-header.component';
import { CommunitySidenavComponent } from './community-sidenav/community-sidenav.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NewUserRegisterComponent } from './new-user-register/new-user-register.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { PrimaryBusinessListComponent } from './primary-business-list/primary-business-list.component';
import { CategoryBusinessListComponent } from './category-business-list/category-business-list.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ServiceCategoryComponent } from './service-category/service-category.component';
import { CompanySizeListComponent } from './company-size-list/company-size-list.component';
import { RegistrationIdentificationComponent } from './registration-identification/registration-identification.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { AccountHandlerDetailsComponent } from './account-handler-details/account-handler-details.component';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MediumSizeCompanyComponent } from './medium-size-company/medium-size-company.component';
import { LargeSizeCompanyComponent } from './large-size-company/large-size-company.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewSCMProfileComponent } from './view-profile-scm-ai/view-profile-scm-ai.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { AfterLoginPageComponent } from './afterLogin-page/afterLogin-page.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { DonutChartComponent } from './chart/donut-chart/donut-chart.component';
import { HomeComponent } from './WowDAO/home/home.component';
import { DemandComponent } from './WowDAO/demand/demand.component';
import { InsightsComponent } from './WowDAO/insights/insights.component';
import { ForecastingComponent } from './WowDAO/forecasting/forecasting.component';
import { QualityComponent } from './WowDAO/quality/quality.component';
import { LogisticsComponent } from './WowDAO/logistics/logistics.component';
import { MaintenanceComponent } from './WowDAO/maintenance/maintenance.component';
import { Tab1Component } from './WowDAO/insights/Tab1/tab1.component';
import { RiskAssessmentComponent } from './WowDAO/insights/risk-assessment/risk-assessment.component';
import { OpportunitiesComponent } from './WowDAO/insights/opportunities/opportunities.component';
import { ThreatsComponent } from './WowDAO/insights/threats/threats.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PersonalInfoComponent } from './edit-profile/personal-info/personal-info.component';
import { WorkflowsComponent } from './WowDAO/workflows/workflows.component';
import { ExperimentsComponent } from './WowDAO/experiments/experiments.component';
import { SupplyChainKpisComponent } from './WowDAO/supply-chain-kpis/supply-chain-kpis.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    NavgationComponent,
    AccountTypeComponent,
    UserDetailsComponent,
    AccountsLinkComponent,
    EmailVerificationComponent,
    SkillsComponent,
    HeaderComponent,
    SideNavComponent,
    ProjectsComponent,
    CommunityComponent,
    CommunityHeaderComponent,
    CommunitySidenavComponent,
    AskQuestionComponent,
    LandingPageComponent,
    NewUserRegisterComponent,
    CompanyListComponent,
    PrimaryBusinessListComponent,
    CategoryBusinessListComponent,
    ProductCategoryComponent,
    ServiceCategoryComponent,
    CompanySizeListComponent,
    RegistrationIdentificationComponent,
    AddressDetailsComponent,
    AccountHandlerDetailsComponent,
    MediumSizeCompanyComponent,
    LargeSizeCompanyComponent,
    ViewProfileComponent,
    ViewSCMProfileComponent,
    CompanyProfileComponent,
    DonutChartComponent,
    HomeComponent,
    DemandComponent,
    InsightsComponent,
    ForecastingComponent,
    QualityComponent,
    LogisticsComponent,
    MaintenanceComponent,
    Tab1Component,
    RiskAssessmentComponent,
    OpportunitiesComponent,
    ThreatsComponent,
    EditProfileComponent,
    PersonalInfoComponent,
    WorkflowsComponent,
    ExperimentsComponent,
    SupplyChainKpisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    QuillModule.forRoot(),
    HttpClientModule,
    FormsModule,
    CommonModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
