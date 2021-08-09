import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FileValueAccessor } from './file-value-accessor';
import { FormlyFieldFile } from './file-type.component';

import { FlexLayoutType } from './flex-layout.type';

import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { PlotlyViaWindowModule } from 'angular-plotly.js';
import { AgmCoreModule } from '@agm/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SchedulerModule } from './scheduler/scheduler.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { HttpInterceptorBasicAuthService } from './service/http/http-interceptor-basic-auth.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';

import { DirectivesModule } from './directives/directives.module';

import { SiteComponent } from './site/site.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerTableComponent } from './customer/table/customer-table/customer-table.component';
import { SiteTableComponent } from './site/table/site-table/site-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RegionDialogComponent } from './shared/dialog/region-dialog/region-dialog.component';
import { CompanyComponent } from './company/company.component';
import { CompanyTableComponent } from './company/table/company-table/company-table.component';
// import { FileDragDropDirective } from "./directives/file-drag-drop/file-drag-drop.directive";
import { EquipmentComponent } from './equipment/equipment.component';
import { EquipmentTableComponent } from './equipment/table/equipment-table/equipment-table.component';
import { SitetypeDialogComponent } from './shared/dialog/sitetype-dialog/sitetype-dialog.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { DataloggerComponent } from './datalogger/datalogger.component';
import { DataLoggerTableComponent } from './datalogger/table/dataLogger-table/dataLogger-table.component';
import { EquipmenttypeComponent } from './equipmenttype/equipmenttype.component';
import { EquipmenttypeTableComponent } from './equipmenttype/table/equipmenttype-table/equipmenttype-table.component';

import { EquipmentCategoryComponent } from './equipment-category/equipment-category.component';
import { EquipmentCategoryTableComponent } from './equipment-category/equipment-category-table/equipment-category-table.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { SignupComponent } from './signup/signup.component';
import { FormlyModule } from '@ngx-formly/core';
import { StandardisedErrorCodeComponent } from './standardised-error-code/standardised-error-code.component';
import { StandardisedErrorCodeTableComponent } from './standardised-error-code/standardised-error-code-table/standardised-error-code-table.component';
import { TicketComponent } from './ticket/ticket.component';
import { EiraInfoComponent } from './eira-info/eira-info.component';
import { EiraTktSearchComponent } from './eira-tkt-search/eira-tkt-search.component';
import { EiraReportsComponent } from './eira-reports/eira-reports.component';
// import { EiraRptTableComponent } from "./eira-rpt-table/eira-rpt-table.component";
// import { EiraRegStep1Component } from "./eira-reg-step1/eira-reg-step1.component";
// import { EiraAnalyticsComponent } from "./eira-analytics/eira-analytics.component";
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { UsermasterComponent } from './usermaster/usermaster.component';
import { UsermasterTableComponent } from './usermaster/usermaster-table/usermaster-table.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserRoleTableComponent } from './user-role/user-role-table/user-role-table.component';
import { UserPermissionMappingComponent } from './user-permission-mapping/user-permission-mapping.component';
import { UserPermissionComponent } from './user-permission/user-permission.component';
import { UserPermissionMappingGridComponent } from './user-permission-mapping/user-permission-mapping-grid/user-permission-mapping-grid.component';
import { UserPermissionMappingTableComponent } from './user-permission-mapping/user-permission-mapping-table/user-permission-mapping-table.component';
import { UserPermsissionTableComponent } from './user-permission/user-permsission-table/user-permsission-table.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    SiteComponent,
    CustomerComponent,
    CustomerTableComponent,
    SiteTableComponent,
    RegionDialogComponent,
    CompanyComponent,
    CompanyTableComponent,
    EquipmentComponent,
    SitetypeDialogComponent,
    SidenavComponent,
    EquipmentTableComponent,
    SideNavMenuComponent,
    DataloggerComponent,
    DataLoggerTableComponent,
    EquipmenttypeComponent,
    EquipmenttypeTableComponent,
    EquipmentCategoryComponent,
    EquipmentCategoryTableComponent,
    UserRegistrationComponent,
    SignupComponent,
    FlexLayoutType,
    FileValueAccessor,
    FormlyFieldFile,
    StandardisedErrorCodeComponent,
    StandardisedErrorCodeTableComponent,
    TicketComponent,
    EiraInfoComponent,
    EiraTktSearchComponent,
    EiraReportsComponent,
    // EiraRptTableComponent,
    // EiraRegStep1Component,
    // EiraAnalyticsComponent,
    PageNotFoundComponent,
    UsermasterComponent,
    UsermasterTableComponent,
    UserRoleComponent,
    UserRoleTableComponent,
    UserPermissionComponent,
    UserPermsissionTableComponent,
    UserPermissionMappingComponent,
    UserPermissionMappingTableComponent,
    UserPermissionMappingGridComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormlyModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    LayoutModule,
    DirectivesModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonToggleModule,
    FormlyModule.forRoot({
      types: [
        { name: 'flex-layout', component: FlexLayoutType },
        { name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    NgxDropzoneModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    PlotlyViaWindowModule,
    Ng2TelInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBsXBn_yVijE0j6Bm5d0WGsclNJ_4UCleo',
    }),
    SchedulerModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorBasicAuthService,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
