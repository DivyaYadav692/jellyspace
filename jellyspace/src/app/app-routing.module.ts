import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavgationComponent } from './navgation/navgation.component';
import { AccountTypeComponent } from './account-type/account-type.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AccountsLinkComponent } from './accounts-link/accounts-link.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { CommunityComponent } from './community/community.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NewUserRegisterComponent } from './new-user-register/new-user-register.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CategoryBusinessListComponent } from './category-business-list/category-business-list.component';
import { PrimaryBusinessListComponent } from './primary-business-list/primary-business-list.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ServiceCategoryComponent } from './service-category/service-category.component';
import { CompanySizeListComponent } from './company-size-list/company-size-list.component';
import { RegistrationIdentificationComponent } from './registration-identification/registration-identification.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { AccountHandlerDetailsComponent } from './account-handler-details/account-handler-details.component';
import { MediumSizeCompanyComponent } from './medium-size-company/medium-size-company.component';
import { LargeSizeCompanyComponent } from './large-size-company/large-size-company.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { AfterLoginPageComponent } from './afterLogin-page/afterLogin-page.component';
import { HomeComponent } from './WowDAO/home/home.component';
import { PlotComponent } from './WowDAO/plot/plot.component';
import { DemandComponent } from './WowDAO/demand/demand.component';
import { ReportsComponent } from './WowDAO/reports/reports.component';
import { ViewSCMProfileComponent } from './view-profile-scm-ai/view-profile-scm-ai.component';
import { InsightsComponent } from './WowDAO/insights/insights.component';
import { InventoryComponent } from './WowDAO/inventory/inventory.component';
import { ForecastingComponent } from './WowDAO/forecasting/forecasting.component';
import { ManagementComponent } from './WowDAO/management/management.component';
import { QualityComponent } from './WowDAO/quality/quality.component';
import { LogisticsComponent } from './WowDAO/logistics/logistics.component';
import { MaintenanceComponent } from './WowDAO/maintenance/maintenance.component';
import { Tab1Component } from './WowDAO/insights/Tab1/tab1.component';
import { RiskAssessmentComponent } from './WowDAO/insights/risk-assessment/risk-assessment.component';
import { OpportunitiesComponent } from './WowDAO/insights/opportunities/opportunities.component';
import { ThreatsComponent } from './WowDAO/insights/threats/threats.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { WorkflowsComponent } from './WowDAO/workflows/workflows.component';
import { ExperimentsComponent } from './WowDAO/experiments/experiments.component';
import { SupplyChainKpisComponent } from './WowDAO/supply-chain-kpis/supply-chain-kpis.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'signin', component: SignInComponent, pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'navigation', component: NavgationComponent, pathMatch: 'full' },
  { path: 'account-type', component: AccountTypeComponent, pathMatch: 'full' },
  { path: 'user-details', component: UserDetailsComponent, pathMatch: 'full' },
  { path: 'supply-chain-kpis', component: SupplyChainKpisComponent, pathMatch: 'full' },
  {
    path: 'accounts-link',
    component: AccountsLinkComponent,
    pathMatch: 'full',
  },
  {
    path: 'email-verification',
    component: EmailVerificationComponent,
    pathMatch: 'full',
  },
  { path: 'skills', component: SkillsComponent, pathMatch: 'full' },
  {
    path: 'new-user-register',
    component: NewUserRegisterComponent,
    pathMatch: 'full',
  },
  { path: 'projects', component: ProjectsComponent, pathMatch: 'full' },
  { path: 'community', component: CommunityComponent, pathMatch: 'full' },
  { path: 'ask-question', component: AskQuestionComponent, pathMatch: 'full' },
  { path: 'company-list', component: CompanyListComponent, pathMatch: 'full' },
  {
    path: 'primary-business',
    component: PrimaryBusinessListComponent,
    pathMatch: 'full',
  },
  {
    path: 'categories',
    component: CategoryBusinessListComponent,
    pathMatch: 'full',
  },
  {
    path: 'product-category',
    component: ProductCategoryComponent,
    pathMatch: 'full',
  },
  {
    path: 'service-category',
    component: ServiceCategoryComponent,
    pathMatch: 'full',
  },
  {
    path: 'company-size',
    component: CompanySizeListComponent,
    pathMatch: 'full',
  },
  {
    path: 'register-identification',
    component: RegistrationIdentificationComponent,
    pathMatch: 'full',
  },
  {
    path: 'address-details',
    component: AddressDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'account-handler',
    component: AccountHandlerDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'medium-size',
    component: MediumSizeCompanyComponent,
    pathMatch: 'full',
  },
  {
    path: 'large-size',
    component: LargeSizeCompanyComponent,
    pathMatch: 'full',
  },
  { path: 'view-profile', component: ViewProfileComponent, pathMatch: 'full' },
  {
    path: 'company-profile',
    component: CompanyProfileComponent,
    pathMatch: 'full',
  },
  { path: 'afterLogin', component: AfterLoginPageComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' }, // Add this route
  { path: 'plot', component: PlotComponent, pathMatch: 'full' }, // Add this route
  { path: 'demand', component: DemandComponent, pathMatch: 'full' }, // Add this route
  { path: 'reports', component: ReportsComponent, pathMatch: 'full' }, // Add this route
  { path: 'inventory', component: InventoryComponent, pathMatch: 'full' }, // Add this route
  { path: 'edit-profile', component: EditProfileComponent, pathMatch: 'full' },
  {
    path: 'scm-profile',
    component: ViewSCMProfileComponent,
    pathMatch: 'full',
  },
  {
    path: 'insights',
    component: InsightsComponent,
    pathMatch: 'full',
  },
  {
    path: 'forecasting',
    component: ForecastingComponent,
    pathMatch: 'full',
  },
  {
    path: 'management',
    component: ManagementComponent,
    pathMatch: 'full',
  },
  {
    path: 'quality',
    component: QualityComponent,
    pathMatch: 'full',
  },
  {
    path: 'logistics',
    component: LogisticsComponent,
    pathMatch: 'full',
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    pathMatch: 'full',
  },
  {
    path: 'tab1',
    component: Tab1Component,
    pathMatch: 'full',
  },
  {
    path: 'risk-assessment',
    component: RiskAssessmentComponent,
    pathMatch: 'full',
  },
  {
    path: 'opportunities',
    component: OpportunitiesComponent,
    pathMatch: 'full',
  },
  { path: 'workflows', component: WorkflowsComponent },
  { path: 'experiments', component: ExperimentsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: ExperimentsComponent }, // Home page handled by Experiments
  // Add other routes as necessary
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
