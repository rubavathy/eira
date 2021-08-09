import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators, FormBuilder, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomerDataService } from "../service/data/customer/customer-data.service";
import { LoginStatusService } from "../service/login-status.service";
import { UsermasterTableComponent } from "./usermaster-table/usermaster-table.component";
import { DataService } from "../shared/Data.service";

@Component({
  selector: "app-usermaster",
  templateUrl: "./usermaster.component.html",
  styleUrls: ["./usermaster.component.css"],
})
export class UsermasterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService,
    public dialog: MatDialog,
    private loginState: LoginStatusService
  ) {}
  customers = [];
  companies = [];
  countries = [];
  states = [];
  cities = [];
  userRoles = [];

  userMasterForm = this.fb.group({
    userId: -1,
    userName: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
    ],
    emailId: "",
    mobileNumber: [
      null,
      Validators.compose([Validators.required, Validators.minLength(10)]),
    ],
    firstName: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
    ],
    lastName: [
      null,
      [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    ],
    designation: "",
    encryptedPassword: "",
    dateOfBirth: "",
    address: "",
    countryId: null,
    stateId: null,
    cityId: null,
    companyId: null,
    customerId: null,
    active: false,
    userRole: "",
    roleName: null,
  });

  onSubmit() {
    this.saveUserMaster();
  }

  showSnackBar(msg: any) {
    this.snackBar.open(msg, "Close", {
      duration: 2000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  saveUserMaster() {
    var userDetailJsonData = this.userMasterForm.value;

    console.log(JSON.stringify(userDetailJsonData));
    if (this.userMasterForm.get("userId").value === -1) {
      this.customerDataService.createUserDetail(userDetailJsonData).subscribe(
        (data) => {
          console.log(data);
          this.showSnackBar("New User created Successfully!");
          //this.UsermasterTableComponent.refresh();

          this.userMasterForm.reset();
          this.resetForm();
        },
        (err) => {
          console.log(err);
          this.showSnackBar(err.error.message);
        }
      );
    } else {
      this.customerDataService.updateUserMaster(userDetailJsonData).subscribe(
        (data) => {
          console.log(data);
          this.showSnackBar("Equipment Details Updated Successfully!");
          // this.UsermasterTableComponent.refresh();
          this.userMasterForm.reset();
          this.resetForm();
        },
        (err) => {
          console.log(err);
          this.showSnackBar(err.error.message);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getCustomers();
    this.getCountries();
    this.getUserRoles();
    this.getCompanies();
  }
  resetForm() {
    this.userMasterForm.get("userName").clearValidators();
    this.userMasterForm.get("userName").updateValueAndValidity();

    this.userMasterForm.get("emailId").clearValidators();
    this.userMasterForm.get("emailId").updateValueAndValidity();

    this.userMasterForm.get("mobileNumber").clearValidators();
    this.userMasterForm.get("mobileNumber").updateValueAndValidity();

    this.userMasterForm.get("firstName").clearValidators();
    this.userMasterForm.get("firstName").updateValueAndValidity();

    this.userMasterForm.get("lastName").clearValidators();
    this.userMasterForm.get("lastName").updateValueAndValidity();

    this.userMasterForm.get("designation").clearValidators();
    this.userMasterForm.get("designation").updateValueAndValidity();

    this.userMasterForm.get("dateOfBirth").clearValidators();
    this.userMasterForm.get("dateOfBirth").updateValueAndValidity();

    this.userMasterForm.get("address").clearValidators();
    this.userMasterForm.get("address").updateValueAndValidity();

    this.userMasterForm.get("countryId").clearValidators();
    this.userMasterForm.get("countryId").updateValueAndValidity();

    this.userMasterForm.get("stateId").clearValidators();
    this.userMasterForm.get("stateId").updateValueAndValidity();

    this.userMasterForm.get("cityId").clearValidators();
    this.userMasterForm.get("cityId").updateValueAndValidity();

    this.userMasterForm.get("companyId").clearValidators();
    this.userMasterForm.get("companyId").updateValueAndValidity();

    this.userMasterForm.get("customerId").clearValidators();
    this.userMasterForm.get("customerId").updateValueAndValidity();

    this.userMasterForm.get("active").clearValidators();
    this.userMasterForm.get("active").updateValueAndValidity();

    this.userMasterForm.get("roleName").clearValidators();
    this.userMasterForm.get("roleName").updateValueAndValidity();
    this.userMasterForm.reset();
  }
  userMasterData: any;
  onEdit(row) {
    var userId = row.userId;
    this.customerDataService.getUserMasterById(row.userId).subscribe((data) => {
      console.log(data);
      this.userMasterData = data;
      this.userMasterData["active"] = String(data["active"]);
      this.userMasterData["roleName"] = data["userRole"]["roleName"];
      this.userMasterForm.setValue(this.userMasterData);
    });
  }

  getCustomers() {
    this.customerDataService.getAllCustomers(1).subscribe((response) => {
      this.customers = response;
    });
  }

  getUserRoles() {
    this.customerDataService.getAllUserRoles().subscribe((response) => {
      this.userRoles = response;
    });
  }

  getCountries() {
    this.dataService.getCountries().subscribe((response) => {
      this.countries = response;
    });
  }

  getStatesByCountry(countryId: any) {
    this.dataService.getStatesByCountryId(countryId).subscribe((response) => {
      this.states = response;
    });
  }

  getCompanies() {
    this.customerDataService.getCompanyMinDetails().subscribe((response) => {
      this.companies = response;
    });
  }

  getCitiesByState(stateId) {
    this.dataService.getCitiesByStateId(stateId).subscribe((response) => {
      this.cities = response;
    });
  }
}
