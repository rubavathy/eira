import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgModule } from '@angular/core';

import { SchedulerComponent } from './scheduler/scheduler.component';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SchedulerTableComponent } from './scheduler-table/scheduler-table.component';
import { SchedulerRoutingModule } from './scheduler-routing.module';
@NgModule({
  declarations: [SchedulerComponent, SchedulerTableComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    FormsModule,
    FlexModule,
    FlexLayoutModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SchedulerRoutingModule,
  ],
})
export class SchedulerModule {}
