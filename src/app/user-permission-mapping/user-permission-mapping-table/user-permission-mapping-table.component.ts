import { EventEmitter } from '@angular/core';
import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';
import { UserPermission } from 'src/app/shared/userPermission.interface';

@Component({
  selector: 'app-user-permission-mapping-table',
  templateUrl: './user-permission-mapping-table.component.html',
  styleUrls: ['./user-permission-mapping-table.component.css'],
})
export class UserPermissionMappingTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() addPermissionEvent = new EventEmitter();
  @Output() getAllPermissionEvent = new EventEmitter();

  @Input() permissionsList: number[] = [];
  public permissions = new MatTableDataSource<UserPermission>();

  permissionsData: UserPermission[];

  displayedColumns: string[] = [
    'given',
    'permissionName',
    'category',
    'view',
    'add',
    'edit',
    'delete',
  ];

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
          this.permissionsData = [...reformedArr];
        });
        console.log(data);
        this.permissions.data = reformedArr;
        this.permissions.sort = this.sort;
        this.getAllPermissionEvent.emit(this.permissionsData);
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

  onAddPermission(permissionId: number) {
    this.addPermissionEvent.emit(permissionId);
  }
}
