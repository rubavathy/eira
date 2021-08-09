import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { UserSiteMappingComponent } from './user-site-mapping/user-site-mapping.component';
import { UserSiteMappingTableComponent } from './user-site-mapping-table/user-site-mapping-table.component';
import { MatSelectModule } from '@angular/material/select';

import { UserSiteMappingRouteingModule } from './user-site-mapping-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UserSiteMappingComponent, UserSiteMappingTableComponent],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    FlexLayoutModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    UserSiteMappingRouteingModule,
  ],
})
export class UserSiteMappingModule {}
