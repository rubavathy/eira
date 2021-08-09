import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CustomerTableItem } from 'src/app/customer/table/customer-table/customer-table.component';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';

@Component({
  selector: 'app-scheduler-table',
  templateUrl: './scheduler-table.component.html',
  styleUrls: ['./scheduler-table.component.css'],
})
export class SchedulerTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource = new MatTableDataSource<CustomerTableItem>();

  displayedColumns = [
    'customerCode',
    'customerName',
    'companyName',
    'country',
    'state',
    'city',
    'active',
    'customerLogo',
    'action',
  ];

  ngOnInit() {
    this.getAllCustomerDetails();
  }

  getAllCustomerDetails() {
    var companyId = 1;
    this.customerDataService
      .getAllCustomers(companyId)
      .subscribe((data: CustomerTableItem[]) => {
        this.dataSource.data = data as CustomerTableItem[];
      });
  }

  constructor(
    private customerDataService: CustomerDataService,
    private sanitizer: DomSanitizer
  ) {}
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    console.log(value);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  refresh() {
    console.log('Inside refresh of Customer Table>>');
    this.customerDataService
      .getAllCustomers(1)
      .subscribe((data: CustomerTableItem[]) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      });
  }

  getCustomerImage(customer: CustomerTableItem): string | SafeResourceUrl {
    // console.log(customer);
    if (customer.customerLogo) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:${customer.logoContentType};base64,${customer.customerLogo}`
      );
    }
    return '../../assets/eira_32x32.png';
  }
}
