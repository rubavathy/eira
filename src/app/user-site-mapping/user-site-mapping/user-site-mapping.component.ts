import { UserSiteMappingTableComponent } from './../user-site-mapping-table/user-site-mapping-table.component';
import {
  UserSiteMappingData,
  UserSiteMappingCustomerData,
} from './../../shared/userSiteMapping.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-site-mapping',
  templateUrl: './user-site-mapping.component.html',
  styleUrls: ['./user-site-mapping.component.css'],
})
export class UserSiteMappingComponent implements OnInit {
  @ViewChild(UserSiteMappingTableComponent)
  private userSiteMappingTableComponent: UserSiteMappingTableComponent;

  users: UserSiteMappingData[];
  //   {
  //     userId: 1,
  //     userName: 'Admin',
  //     siteIds: [1, 2],
  //     customers: [
  //       {
  //         customerId: 1,
  //         sites: [1, 2],
  //       },
  //     ],
  //   },
  //   {
  //     userId: 2,
  //     userName: 'Employee',
  //     siteIds: [1, 3],
  //     customers: [
  //       {
  //         customerId: 1,
  //         sites: [1],
  //       },
  //       {
  //         customerId: 2,
  //         sites: [3],
  //       },
  //     ],
  //   },
  // ];
  allSiteIds: number[] = [];
  customers: UserSiteMappingCustomerData[];
  //  = [
  //   {
  //     customerId: 1,
  //     customerName: 'ICE',
  //     sites: [
  //       { siteId: 1, siteName: 'ICE Chennai' },
  //       { siteId: 2, siteName: 'ICE Coimbatore' },
  //     ],
  //   },
  //   {
  //     customerId: 2,
  //     customerName: 'HCL',
  //     sites: [{ siteId: 3, siteName: 'HCL Coimbatore' }],
  //   },
  // ];

  userSiteMappingForm: FormGroup = this.fb.group({
    userId: ['', [Validators.required]],
    userName: [''],
  });

  manualUser: UserSiteMappingData;

  siteData: any;

  constructor(
    private fb: FormBuilder,
    private custumerDataService: CustomerDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.custumerDataService
      .getAllSites()
      .subscribe((customerData: UserSiteMappingCustomerData[]) => {
        console.log(customerData);
        this.customers = customerData;
        customerData.forEach((customer) => {
          customer.sites.forEach((site) => {
            this.allSiteIds.push(site.siteId);
          });
        });
        this.allSiteIds = [...new Set(this.allSiteIds)];
      });
    this.custumerDataService
      .getAllUsersForUserSiteMapping()
      .subscribe((users: any) => {
        let count = 1;
        console.log(users);
        users.forEach((user) => {
          if (!user.customers) {
            user.customers = JSON.parse(user.mappedSites);
          }
          const siteIds: number[] = [];
          user.customers.forEach((customer) => {
            customer.sites = customer.sites;
            delete customer.mappedSites;
            customer.sites.forEach((site) => {
              siteIds.push(site);
            });
          });
          delete user.mappedSites;
          user.siteIds = [...new Set(siteIds)];
          user.userName = `User Name ${count}`;
          count = count + 1;
        });
        this.users = users;
      });
  }

  onSubmit() {
    const data: any = { ...this.manualUser };

    data.mappedSites = JSON.stringify(data.customers);
    delete data.siteIds;
    console.log(data);
    this.custumerDataService.updateUserForUserSiteMapping(data).subscribe(
      (data) => {
        console.log(data);
        this.showSnackBar('Company created Successfully!');
        this.userSiteMappingTableComponent.refresh();

        this.userSiteMappingForm.reset();
        this.resetForm();
      },
      (err) => {
        console.log(err);
        this.showSnackBar(err.error.message);
        // this.showSnackBar(err.error);
      }
    );
  }

  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  getIfSiteSelected(siteId: number): boolean {
    // this.isUserChanged &&
    // this.allSiteIds.length !== this.siteIdCount
    if (this.manualUser) {
      const res = this.manualUser.siteIds.find((id) => siteId === id);

      return res ? true : false;
    }

    return false;
  }

  resetForm() {
    this.userSiteMappingForm.reset();

    console.log(this.userSiteMappingForm.value);
  }

  updateSite(siteId: number) {
    console.log(this.userSiteMappingForm.value);
    console.log(siteId);
  }

  updateFormValue(
    event: MatOptionSelectionChange | true,
    userId,
    i: number | ''
  ) {
    console.log(userId);

    if (event === true || event.source.selected) {
      if (i === '') {
        this.manualUser = this.users.find(({ userId }) => userId === userId);
        this.userSiteMappingForm.patchValue({ userId: userId });
      } else {
        console.log(event);
        this.manualUser = this.users[i];
        console.log(this.manualUser);
      }
    }
  }

  selectAllForCustomer(customer) {}

  deSelectAllForCustomer(customer) {}

  updateCustomerData(
    event: MatCheckboxChange,
    data: {
      customerId: number;
      customerName: string;
      site: { siteId: number; siteName: string };
    }
  ) {
    console.log(this.userSiteMappingForm.value);

    console.log(event);

    console.log(data);
    let foundCustomer: boolean = false;
    this.manualUser.customers.forEach((customer) => {
      if (customer.customerId === data.customerId) {
        if (event.checked) {
          customer.sites.push(data.site.siteId);
          this.manualUser.siteIds.push(data.site.siteId);
        } else {
          customer.sites = customer.sites.filter(
            (site) => site !== data.site.siteId
          );

          this.manualUser.siteIds = this.manualUser.siteIds.filter(
            (site) => site !== data.site.siteId
          );

          if (customer.sites.length === 0) {
            this.manualUser.customers = this.manualUser.customers.filter(
              (customerAll) => customerAll.customerId !== customer.customerId
            );
          }
        }
        customer.sites = [...new Set(customer.sites)];

        foundCustomer = true;
      }
    });
    if (event.checked && !foundCustomer) {
      this.manualUser.customers.push({
        customerId: data.customerId,
        sites: [data.site.siteId],
      });
      this.manualUser.siteIds.push(data.site.siteId);
      console.log(this.manualUser.customers);
    }

    console.log(this.manualUser);
  }
}
