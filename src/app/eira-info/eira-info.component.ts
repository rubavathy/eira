import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDataService } from '../service/data/customer/customer-data.service';

export interface TicketDetails {
  ticketId: number;
  siteName: string;
  displayName: string;
  severity: string;
  ticketType: string;
  ticketCategoryName: string;
  ticketDetail: string;
  assignedTo: string;
  createdBy: string;
  startedOn: string;
  ticketStatus: string;
}

@Component({
  selector: 'app-eira-info',
  templateUrl: './eira-info.component.html',
  styleUrls: ['./eira-info.component.css'],
})
export class EiraInfoComponent implements AfterViewInit {
  searchCriteria;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'ticketId',
    'siteName',
    'displayName',
    'severity',
    'ticketType',
    'ticketCategoryName',
    'ticketStatus'
  ];

  dataSource = new MatTableDataSource<TicketDetails>();

  constructor(private customerDataService: CustomerDataService) {}

  ngOnInit() {}

  refresh() {
    this.customerDataService
      .searchTickets(this.searchCriteria)
      .subscribe((data) => {
        console.log(data);
        if (data.status === 200) {
          this.dataSource.data = data.body as TicketDetails[];
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource.data = [];
        }
      });
  }

  getToolTipData(elementId: any): string {
    //  const element = this.displayedColumns.find(i => i.ticketId === elementId);

    console.log(elementId);
    return `Ticket Id: ${elementId.ticketId} | | |
      Sceduled On: ${elementId.scheduledOn} | | |
      Starteds On : ${elementId.startedOn} | | |
      Completed On: ${elementId.completedOn}`;
  }

  public applyFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
