import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDataService } from '../service/data/customer/customer-data.service';
import { UserRoleTableComponent } from './user-role-table/user-role-table.component';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  userRoleForm = this.fb.group({
    roleId: -1,
    roleName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    active: [ '', Validators.required],
    description: ['',[ Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(200)
                 ]],
    
  });




  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService

  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.userRoleForm.valid) {
      this.saveUserRole();
    }

  }

  
  showSnackBar(msg: any) {
    this.snackBar.open(msg, "Close", {
      duration: 2000,
      horizontalPosition: "end",
      verticalPosition: "top",

    });
  }

  saveUserRole() {
    var userRoleDetailJsonData = this.userRoleForm.value;

    console.log(JSON.stringify(userRoleDetailJsonData));
    if (this.userRoleForm.get("roleId").value === -1) {
      this.customerDataService
        .createUserRoleDetail(userRoleDetailJsonData)
        .subscribe(
          (data) => {
            console.log(data);
            this.showSnackBar("New User Role created Successfully!");
            //this.UsermasterTableComponent.refresh();

            this.userRoleForm.reset();
            this.resetForm();
          },
          (err) => {
            console.log(err);
            this.showSnackBar(err.error.message);
          }
        );
    } else {
      this.customerDataService
        .updateUserRole(userRoleDetailJsonData)
        .subscribe(
          (data) => {
            console.log(data);
            this.showSnackBar("User Role!");
          // this.UsermasterTableComponent.refresh();
            this.userRoleForm.reset();
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
    this.userRoleForm.get('roleName').clearValidators();
    this.userRoleForm.get('roleName').updateValueAndValidity();
    
    this.userRoleForm.get('active').clearValidators();
    this.userRoleForm.get('active').updateValueAndValidity();

    this.userRoleForm.get('description').clearValidators();
    this.userRoleForm.get('description').updateValueAndValidity();
   

    this.userRoleForm.reset();


  }

  onEdit(row) {
    this.customerDataService.getUserRoleById(row.roleId) .subscribe (
     data => {
       console.log(data);
       this.userRoleForm.setValue(data);
        }
   )
 }

}
