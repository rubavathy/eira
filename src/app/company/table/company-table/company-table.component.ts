import { Company } from './../../../shared/companyDetails';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

export interface CompanyTableItem {
  companyId: number;
  companyCode: string;
  companyName: string;
  companyType: string;
  country: string;
  state: string;
  city: string;
  companyLogo: any;
  active: boolean;
  logoContentType: string;
  logoContentLength: number;
}

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.css'],
})
export class CompanyTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit = new EventEmitter<boolean>();
  public dataSource = new MatTableDataSource<CompanyTableItem>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  displayedColumns = [
    'companyCode',
    'companyName',
    'location',
    'active',
    'companyLogo',
    'action',
  ];

  ngOnInit() {
    this.getAllCompanyDetails();
  }

  getAllCompanyDetails() {
    this.customerDataService.getCompanyDetails().subscribe((data: any) => {
      this.dataSource.data = data as CompanyTableItem[];
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
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  refresh() {
    console.log('Inside refresh of Company Table>>');
    this.customerDataService
      .getCompanyDetails()
      .subscribe((data: CompanyTableItem[]) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      });
  }

  editCompany(row) {
    console.log(row);

    this.edit.emit(row);
  }

  getCompanyImage(company: CompanyTableItem): string | SafeResourceUrl {
    // console.log(company);
    if (company.companyLogo) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:${company.logoContentType};base64,${company.companyLogo}`
      );
    }
    return '../../assets/eira_32x32.png';
  }
}
