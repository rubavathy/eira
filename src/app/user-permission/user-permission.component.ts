import { UserPermission } from './../shared/userPermission.interface';
import { CustomerDataService } from 'src/app/service/data/customer/customer-data.service';

import { UserPermsissionTableComponent } from './user-permsission-table/user-permsission-table.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css'],
})
export class UserPermissionComponent implements OnInit {
  categories: string[] = ['site', 'comapany', 'customer'];
  roles: string[] = ['Admin'];
  userPermissionForm: FormGroup = this.fb.group({
    permissionId: -1,
    permissionName: ['', [Validators.required]],
    category: ['', Validators.required],
    permission: [''],
    view: [false],
    add: [false],
    edit: [false],
    delete: [false],
    active: [false],
  });

  @ViewChild(UserPermsissionTableComponent)
  private userPermissionTableComponent: UserPermsissionTableComponent;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.userPermissionForm.valid) {
      this.sendData();
    }
  }
  sendData() {
    if (this.userPermissionForm.controls['permissionId'].value === -1) {
      this.customerDataService
        .addUserPermission(this.getPermissionDetail())
        .subscribe(
          (data) => {
            console.log(data);
            this.showSnackBar('Permission Created Successfully!');
            this.userPermissionTableComponent.refresh();
            this.resetForm();
          },
          (err) => {
            console.log(err);
            this.showSnackBar(err.error.message);
          }
        );
    } else {
      this.customerDataService
        .addUserPermission(this.getPermissionDetail())
        .subscribe(
          (data) => {
            console.log(data);
            this.showSnackBar('Permission Edited Successfully!');
            this.userPermissionTableComponent.refresh();
            this.resetForm();
          },
          (err) => {
            console.log(err);
            this.showSnackBar(err.error.message);
          }
        );
    }
  }

  resetForm() {
    this.userPermissionForm.get('permissionName').clearValidators();
    this.userPermissionForm.get('permissionName').updateValueAndValidity();

    this.userPermissionForm.reset();
    this.userPermissionForm.clearValidators();
  }

  onEdit() {}

  editPermission(permission) {
    console.log(permission);
    this.userPermissionForm.setValue(permission);
  }

  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  getPermissionDetail(): UserPermission {
    const permissionsString = JSON.stringify({
      add: this.userPermissionForm.controls['add'].value,
      delete: this.userPermissionForm.controls['delete'].value,
      edit: this.userPermissionForm.controls['edit'].value,
      view: this.userPermissionForm.controls['view'].value,
    });
    this.userPermissionForm.patchValue({ permission: permissionsString });
    const formValue: UserPermission = this.userPermissionForm.value;
    delete formValue.delete;
    delete formValue.add;
    delete formValue.view;
    delete formValue.edit;

    if (formValue.permissionId === -1) {
      const data = { ...formValue };
      delete data.permissionId;
      console.log(data);
      return data;
    }
    console.log(formValue);
    return formValue;
  }
}
