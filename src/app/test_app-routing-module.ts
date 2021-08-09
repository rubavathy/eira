import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataloggerComponent } from './datalogger/datalogger.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { EquipmenttypeComponent } from './equipmenttype/equipmenttype.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { SiteComponent } from './site/site.component';
import { EquipmentCategoryComponent } from './equipment-category/equipment-category.component';
import { SignupComponent } from './signup/signup.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { StandardisedErrorCodeComponent } from './standardised-error-code/standardised-error-code.component';
import { TicketComponent } from './ticket/ticket.component';
// import { EiraRegStep1Component } from './eira-reg-step1/eira-reg-step1.component';
import { EiraInfoComponent } from './eira-info/eira-info.component';
import { EiraTktSearchComponent } from './eira-tkt-search/eira-tkt-search.component';
// import { EiraReportsComponent } from './eira-reports/eira-reports.component';
// import { EiraRptTableComponent } from './eira-rpt-table/eira-rpt-table.component';
// import { EiraAnalyticsComponent } from './eira-analytics/eira-analytics.component';
// import { RegistrationSuccessComponent } from './user-registration/registration-success/registration-success.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { UsermasterComponent } from './usermaster/usermaster.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { SchedulerComponent } from './scheduler/scheduler/scheduler.component';
import { UserPermissionMappingComponent } from './user-permission-mapping/user-permission-mapping.component';
import { UserPermissionComponent } from './user-permission/user-permission.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user-registration', component: UserRegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RouteGuardService],
    data: { pageTitle: 'Eira Home'}
  },
  { path: 'site', component: SiteComponent, canActivate: [RouteGuardService],
  data: { pageTitle: 'Site Configuration'} },
  
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [RouteGuardService],
    data: { pageTitle: 'Company Configuration'} 
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [RouteGuardService],  data: { pageTitle: 'Customer Configuration'} 
  },
  {
    path: 'equipmenttype',
    component: EquipmenttypeComponent,
    canActivate: [RouteGuardService],  data: { pageTitle: 'Equipment Type Configuration'} 
  },
  {
    path: 'equipment',
    component: EquipmentComponent,
    canActivate: [RouteGuardService],  data: { pageTitle: 'Equipment Configuration'} 
  },
  {
    path: 'equipment-category',
    component: EquipmentCategoryComponent,
    canActivate: [RouteGuardService],  data: { pageTitle: 'Equipment Category Configuration'} 
  },
  {
    path: 'standardised-error-code',
    component: StandardisedErrorCodeComponent,
    canActivate: [RouteGuardService],  data: { pageTitle: 'Standardised EC Configuration'} 

  },
  {
    path: 'datalogger',
    component: DataloggerComponent,
    canActivate: [RouteGuardService],  data: { pageTitle: 'DataLogger Configuration'} 
  },
  {
    path: 'usermaster',
    component: UsermasterComponent,
    canActivate: [RouteGuardService],  data: { pageTitle: 'User Configuration'} 
  },
  {
    path: 'userrole',
    component: UserRoleComponent,
    canActivate: [RouteGuardService],  data: { pageTitle: 'UserRole Configuration'} 
  },
  {
    path: 'ticket',
    component: TicketComponent,
    canActivate: [RouteGuardService],  data: { pageTitle: 'Create New Ticket'} 
  },
  {
    path: 'eira-info',
    component: EiraInfoComponent,
    canActivate: [RouteGuardService] 
  },
  {
    path: 'eira-tkt-search',
    component: EiraTktSearchComponent,
    canActivate: [RouteGuardService],  data: { pageTitle: 'Site Configuration'} 
  },
  // {path: 'eira-reports', component:EiraReportsComponent},
  // {path: 'eira-rpt-table', component:EiraRptTableComponent},
  // {path: 'eira-analytics', component:EiraAnalyticsComponent},

  // {path: 'eira-reg-step1', component:EiraRegStep1Component},
  // {path: 'registration-success', component:RegistrationSuccessComponent},
  {
    path: 'user-permission',
    component: UserPermissionComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'user-permission-mapping',
    component: UserPermissionMappingComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'scheduler',
    component: SchedulerComponent,
    canActivate: [RouteGuardService],
    
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [RouteGuardService],
  },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
