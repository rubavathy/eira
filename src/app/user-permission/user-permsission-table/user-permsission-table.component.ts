import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';
import { UserPermission } from './../../shared/userPermission.interface';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-permsission-table',
  templateUrl: './user-permsission-table.component.html',
  styleUrls: ['./user-permsission-table.component.css'],
})
export class UserPermsissionTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() editPermissionEvent = new EventEmitter();
  public permissions = new MatTableDataSource<UserPermission>();

  displayedColumns: string[] = [
    'permissionName',
    'category',
    'view',
    'add',
    'edit',
    'delete',
    'action',
  ];
  // permissions: UserPermission[] = [
  //   {
  //     permissionId: 1,
  //     permissionName: 'Test1',
  //     category: 'Site',
  //     view: true,
  //     add: false,
  //     edit: false,
  //   },
  // ];

  constructor(private custumerDataService: CustomerDataService) {}

  ngOnInit(): void {
    this.getAllUserPermissions();
  }

  getAllUserPermissions() {
    this.custumerDataService
      .getAllUserPermissions()
      .subscribe((data: UserPermission[]) => {
        const reformedArr: UserPermission[] = [];
        data.forEach((element: UserPermission) => {
          if (element.permission) {
            const permissionValues: {
              add: boolean;
              edit: boolean;
              view: boolean;
              delete: boolean;
            } = JSON.parse(element.permission);
            element.add = permissionValues.add;
            element.edit = permissionValues.edit;
            element.delete = permissionValues.delete;
            element.view = permissionValues.view;
            reformedArr.push(element);
          }
        });
        console.log(data);
        this.permissions.data = reformedArr;
        this.permissions.sort = this.sort;
      });
  }

  refresh() {
    this.getAllUserPermissions();
  }

  ngAfterViewInit() {
    this.permissions.sort = this.sort;
    this.permissions.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.permissions.filter = value.trim().toLocaleLowerCase();
  };

  onEditPermission(permission: UserPermission) {
    console.log(permission);
    this.editPermissionEvent.emit(permission);
  }
}
