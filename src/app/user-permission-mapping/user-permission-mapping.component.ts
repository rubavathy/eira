import { UserPermissionMappingTableComponent } from './user-permission-mapping-table/user-permission-mapping-table.component';
import { FormBuilder, Validators } from '@angular/forms';
import { UserPermission } from 'src/app/shared/userPermission.interface';
import { UserPermissionMappingData } from './../shared/userPermissionMapping.interface';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-permission-mapping',
  templateUrl: './user-permission-mapping.component.html',
  styleUrls: ['./user-permission-mapping.component.css'],
})
export class UserPermissionMappingComponent implements OnInit {
  gotRoles: boolean;
  role: UserPermissionMappingData;
  permissions: UserPermission[];
  roles: UserPermissionMappingData[] = [];

  @ViewChild(UserPermissionMappingTableComponent)
  private userPermissionMappingTableComponent: UserPermissionMappingTableComponent;

  userRolePermissionForm = this.fb.group({
    mapId: [null],
    permissionsList: [null],
    active: [null, Validators.required],
    permissions: [null, Validators.required],
    userRole: this.fb.group({
      active: [false, Validators.required],
      roleId: -1,
      roleName: [null, Validators.required],
      description: [null, Validators.required],
    }),
  });
  rolesLength: number;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private customerDataService: CustomerDataService
  ) {}

  ngOnInit(): void {
    if (!this.gotRoles) {
      this.getRoles();
    }
  }

  getRoles() {
    this.customerDataService
      .getAllRolesForUserPermissionMapping()
      .subscribe((data: any[]) => {
        console.log(data);
        data.forEach((role) => {
          delete role.userRole.hibernateLazyInitializer;
          role.permissionsList = JSON.parse(role.permissions);
          role.permissionsList = role.permissionsList.permissionsIds;
        });
        this.roles = [...data];
        this.gotRoles = true;
        console.log(this.roles);
        this.rolesLength = this.roles.length - 1;
      });
  }

  updatePermissionsValue(index: number) {
    console.log(index);
    this.role = this.roles[index];
    this.userRolePermissionForm.setValue(this.role);
  }

  addPermission(newPermissionId: number) {
    if (this.role) {
      console.log(!this.role.permissionsList.includes(newPermissionId));
      if (!this.role.permissionsList.includes(newPermissionId)) {
        this.role.permissionsList.push(newPermissionId);
        console.log(this.role.permissionsList);
      } else {
        const index = this.role.permissionsList.indexOf(newPermissionId);
        this.role.permissionsList.splice(index, 1);
        console.log(this.role.permissionsList);
      }
      this.userRolePermissionForm.patchValue({
        permissionsList: this.role.permissionsList,
      });
    }
  }
  resetForm() {
    this.userRolePermissionForm.reset();
    this.role = null;
  }
  getPermissionNames(permissionsList: number[]) {
    let permissionNames = '';

    if (this.permissions) {
      if (permissionsList.length !== 0) {
        for (let index = 0; index < permissionsList.length; index++) {
          if (index === permissionsList.length - 1) {
            permissionNames =
              permissionNames +
              this.permissions.find(
                (i) => i.permissionId === permissionsList[index]
              ).permissionName +
              '.';
          } else {
            permissionNames =
              permissionNames +
              this.permissions.find(
                (i) => i.permissionId === permissionsList[index]
              ).permissionName +
              ', ';
          }
        }
      } else {
        return 'None.';
      }
    }
    return permissionNames;
  }

  getPermissions(permissions: UserPermission[]) {
    this.permissions = permissions;
  }

  onSubmit() {
    if (this.userRolePermissionForm.valid) {
      const senderData = { ...this.userRolePermissionForm.value };
      senderData.permissions = JSON.stringify({
        permissionsIds: this.role.permissionsList,
      });
      delete senderData.permissionsList;
      console.log(senderData);
      this.customerDataService.updateUSerPermission(senderData).subscribe(
        (data) => {
          console.log(data);
          this.showSnackBar('Permission Edited Successfully!');
          this.userPermissionMappingTableComponent.refresh();

          this.resetForm();
        },
        (err) => {
          console.log(err);
          this.showSnackBar(err.error.message);
          // this.showSnackBar(err.error);
        }
      );
    }
  }
  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
