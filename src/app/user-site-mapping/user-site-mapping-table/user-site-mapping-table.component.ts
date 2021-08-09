import { UserSiteMappingData } from './../../shared/userSiteMapping.interface';
import { Output, EventEmitter } from '@angular/core';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';

@Component({
  selector: 'app-user-site-mapping-table',
  templateUrl: './user-site-mapping-table.component.html',
  styleUrls: ['./user-site-mapping-table.component.css'],
})
export class UserSiteMappingTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() edit = new EventEmitter<number>();
  @Input() userRoles: {
    userId: number;
    userName: string;
    siteIds: number[];
    customers: {
      customerId: number;
      customerName: string;
      sites: number[];
      siteDetails: { siteId: number; siteName: string }[];
    }[];
  }[] = [];
  @Input() customers: {
    customerId: number;
    customerName: string;
    sites: { siteId: number; siteName: string }[];
  }[] = [];
  public users = new MatTableDataSource<{
    customerId: number;
    customerName: string;
    sites: {
      siteId: number;
      siteName: string;
    }[];
    siteNames: string;
    userId: number;
    userName: string;
  }>();

  isGrouped: boolean = false;

  displayedColumns: string[] = ['userRole', 'customerName', 'siteName', 'edit'];

  reformedData: any[] = [];
  constructor(private custumerDataService: CustomerDataService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.userRoles && changes.userRoles) {
      this.userRoles = changes.userRoles.currentValue;
    }
    if (this.customers && changes.customers) {
      this.customers = changes.customers.currentValue;
    }
    if (this.userRoles && this.customers && !this.isGrouped) {
      console.log(changes);
      this.generateTableData();

      // (
      //   this.userRoles as {
      //     userId: number;
      //     userName: string;
      //     siteIds: number[];
      //     customers: {
      //       customerId: number;
      //       customerName: string;
      //       sites: number[];
      //       siteDetails: { siteId: number; siteName: string }[];
      //     }[];
      //   }[]
      // ).forEach((user) => {
      //   user.customers.forEach((customer) => {
      //     const foundCustomer = this.customers.find(
      //       (allCustomer) => allCustomer.customerId === customer.customerId
      //     );
      //     customer.customerName = foundCustomer.customerName;
      //     customer.siteDetails = [];
      //     customer.sites.forEach((site) => {
      //       console.log(site);

      //       const foundSite = foundCustomer.sites.find(
      //         (allSite) => allSite.siteId === site
      //       );
      //       console.log(foundSite);
      //       if (foundSite) {
      //         customer.siteDetails.push(foundSite);
      //       }
      //     });
      //   });
      // });
      // console.log(this.userRoles);

      // const res = [];
      // this.userRoles.forEach((user) => {
      //   user.customers.forEach((customer) => {
      //     let siteNames = '';
      //     for (let i = 0; i < customer.siteDetails.length; i++) {
      //       if (customer.siteDetails.length - 1 === i) {
      //         siteNames += customer.siteDetails[i].siteName + '.';
      //       } else {
      //         siteNames += customer.siteDetails[i].siteName + ', ';
      //       }
      //     }
      //     res.push({
      //       userId: user.userId,
      //       userName: user.userName,
      //       customerId: customer.customerId,
      //       customerName: customer.customerName,
      //       sites: customer.sites,
      //       siteNames: siteNames,
      //     });
      //   });
      // });
      // console.log(res);
      // this.isGrouped = true;
      // this.users.data = res;
    }

    //
    //           GROUP BY FUCTION
    //
    // if (
    //   changes.userRoles &&
    //   changes.customers &&
    //   changes.userRoles.firstChange &&
    //   changes.customers.firstChange
    // ) {
    //   userRoles.forEach(
    //     (user: { userId: number; userName: string; sites: number[] }) => {
    //       user.sites.forEach((siteIdInUser: number) => {
    //         const res = (
    //           customers as {
    //             customerId: number;
    //             customerName: string;
    //             sites: { siteId: number; siteName: string }[];
    //           }[]
    //         ).find(
    //           (customer: {
    //             customerId: number;
    //             customerName: string;
    //             sites: { siteId: number; siteName: string }[];
    //           }) => {
    //             customer.sites.find((site) => {
    //               if (siteIdInUser === site.siteId) {
    //                 this.reformedData.push({
    //                   ...site,
    //                   customerName: customer.customerName,
    //                   customerId: customer.customerId,
    //                   userId: user.userId,
    //                   userName: user.userName,
    //                 });
    //                 return { ...customer, ...site };
    //               }
    //             });
    //           }
    //         );
    //       });
    //     }
    //   );
    //   const groups = ['userName', 'customerName'];
    //   const grouped = {};
    //   this.reformedData.forEach(function (a) {
    //     groups
    //       .reduce(function (o, g, i) {
    //         o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {});
    //         return o[a[g]];
    //       }, grouped)
    //       .push(a);
    //   });
    //   const res = [];
    //   console.log(grouped);
    //   for (const [user, customers] of Object.entries(grouped)) {
    //     console.log(grouped[user]);
    //     for (const [customer, site] of Object.entries(customers)) {
    //       console.log(site);
    //       let siteNames = '';
    //       for (let i = 0; i < site.length; i++) {
    //         if (site.length - 1 === i) {
    //           siteNames += site[i].siteName + '.';
    //         } else {
    //           siteNames += site[i].siteName + ', ';
    //         }
    //       }
    //       res.push({
    //         userName: user,
    //         userId: site[0].userId,
    //         customerName: customer,
    //         customerId: site[0].customerId,
    //         site: site,
    //         siteNames: siteNames,
    //       });
    //     }
    //   }
    //   console.log(res);
    //   this.users.data = res;
    // }
  }

  generateTableData() {
    (
      this.userRoles as {
        userId: number;
        userName: string;
        siteIds: number[];
        customers: {
          customerId: number;
          customerName: string;
          sites: number[];
          siteDetails: { siteId: number; siteName: string }[];
        }[];
      }[]
    ).forEach((user) => {
      user.customers.forEach((customer) => {
        const foundCustomer = this.customers.find(
          (allCustomer) => allCustomer.customerId === customer.customerId
        );
        customer.customerName = foundCustomer.customerName;
        customer.siteDetails = [];
        customer.sites.forEach((site) => {
          console.log(site);

          const foundSite = foundCustomer.sites.find(
            (allSite) => allSite.siteId === site
          );
          console.log(foundSite);
          if (foundSite) {
            customer.siteDetails.push(foundSite);
          }
        });
      });
    });
    console.log(this.userRoles);

    const res = [];
    this.userRoles.forEach((user) => {
      user.customers.forEach((customer) => {
        let siteNames = '';
        for (let i = 0; i < customer.siteDetails.length; i++) {
          if (customer.siteDetails.length - 1 === i) {
            siteNames += customer.siteDetails[i].siteName + '.';
          } else {
            siteNames += customer.siteDetails[i].siteName + ', ';
          }
        }
        res.push({
          userId: user.userId,
          userName: user.userName,
          customerId: customer.customerId,
          customerName: customer.customerName,
          sites: customer.sites,
          siteNames: siteNames,
        });
      });
    });
    console.log(res);
    this.isGrouped = true;
    this.users.data = res;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.users.sort = this.sort;
    this.users.paginator = this.paginator;
  }

  getSiteName(
    sites: {
      customerId: number;
      customerName: string;
      siteId: number;
      siteName: string;
      userId: number;
      userName: string;
    }[]
  ) {}

  public doFilter = (value: string) => {
    this.users.filter = value.trim().toLocaleLowerCase();
  };

  editUserSitePermission(row) {
    console.log(row);

    const user = this.userRoles.find(({ userId }) => row.userId === userId);
    this.edit.emit(row.userId);
  }

  refresh() {
    this.generateTableData();
  }
}
