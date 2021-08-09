import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';
import { UserPermission } from 'src/app/shared/userPermission.interface';

@Component({
  selector: 'app-user-permission-mapping-grid',
  templateUrl: './user-permission-mapping-grid.component.html',
  styleUrls: ['./user-permission-mapping-grid.component.css'],
})
export class UserPermissionMappingGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() addPermissionEvent = new EventEmitter();
  @Output() getAllPermissionEvent = new EventEmitter();
  @Input() permissionsList: number[] = [];
  permissions: UserPermission[];

  permissionsData: UserPermission[];

  displayedColumns: string[] = [
    'given',
    'permissionId',
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
        this.permissions = reformedArr;

        this.getAllPermissionEvent.emit(this.permissionsData);
      });
  }

  refresh() {
    this.getAllUserPermissions();
  }

  // ngAfterViewInit() {
  //   this.permissions.sort = this.sort;
  //   this.permissions.dar = this.paginator;
  // }

  // public doFilter = (value: string) => {
  //   this.permissions.filter = value.trim().toLocaleLowerCase();
  // };

  onAddPermission(permissionId: number) {
    this.addPermissionEvent.emit(permissionId);
  }
}
