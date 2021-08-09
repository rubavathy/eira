import { Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild, } from '@angular/core';
import { CustomerDataService } from "src/app/service/data/customer/customer-data.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";


export interface UserRoleTableItem {
  userId : number,
  roleName : String,
  active : boolean,
  description: String
}

@Component({
  selector: 'app-user-role-table',
  templateUrl: './user-role-table.component.html',
  styleUrls: ['./user-role-table.component.css']
})
export class UserRoleTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit = new EventEmitter<boolean>();
  public dataSource = new MatTableDataSource<UserRoleTableItem>();

  displayedColumns = [
    "roleName",
    "description",
    "active",
    "action"
  ];

  
ngAfterViewInit() {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
 }

  constructor(private customerDataService: CustomerDataService,
    ) { }

  public doFilter = (value: string) => {
    console.log(value);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  editUserrole(row) {
    console.log(JSON.stringify(row));
    this.edit.emit(row);
  }

  getAllRoles(){
    this.customerDataService.getAllRoles().subscribe((data: UserRoleTableItem[]) => {
    console.log("RoleData"+ JSON.stringify(data));
      this.dataSource.data = data as UserRoleTableItem[];
  
  });
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  public  refresh() {
    this.getAllRoles();
  }
}
