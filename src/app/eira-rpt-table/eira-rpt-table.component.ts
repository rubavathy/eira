import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TicketDetails } from '../eira-info/eira-info.component';



@Component({
  selector: 'app-eira-rpt-table',
  templateUrl: './eira-rpt-table.component.html',
  styleUrls: ['./eira-rpt-table.component.css']
})
export class EiraRptTableComponent implements OnInit {



  constructor() { }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['id',
  'siteName',
  'priority',
  'category',
  'subject',
  'state',
  'status'];
  dataSource =  new MatTableDataSource<TicketDetails>();



}
