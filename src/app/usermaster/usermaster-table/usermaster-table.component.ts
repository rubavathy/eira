import { Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild, } from '@angular/core';
import { CustomerDataService } from "src/app/service/data/customer/customer-data.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";


export interface UserMasterTableItem {
  userId : number,
  userName : String,
  emailId : String,
  mobileNumber : String,
  firstName : String,
  lastName : String,
  designation : String,
  encryptedPassword : String,
  dateOfBirth : String,
  address : String,
  countryId : number,
  stateId : number,
  cityId : number,
  companyId : number,
  customerId : number,
  active : boolean,
  roleName: String
}

@Component({
  selector: 'app-usermaster-table',
  templateUrl: './usermaster-table.component.html',
  styleUrls: ['./usermaster-table.component.css']
})
export class UsermasterTableComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit = new EventEmitter<boolean>();
  public dataSource = new MatTableDataSource<UserMasterTableItem>();


displayedColumns = [
  "firstName",
  "lastName",
  "roleName",
  "userName",
  "designation",
  "active",
  "action"
];

ngAfterViewInit() {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
 }

  constructor( private customerDataService: CustomerDataService) { }

  public doFilter = (value: string) => {
    console.log(value);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
  editUsermaster(row) {
    console.log(JSON.stringify(row));
    this.edit.emit(row);
  }

  getAllUsers(){
    this.customerDataService.getAllUsers().subscribe((data: UserMasterTableItem[]) => {
    console.log("UserData"+ JSON.stringify(data));
      this.dataSource.data = data as UserMasterTableItem[];
  
  });
  }
  

  ngOnInit(): void {
    this.getAllUsers();
  }

  public  refresh() {
    this.getAllUsers();
  }

}


