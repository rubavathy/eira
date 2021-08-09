import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EiraInfoComponent } from "../eira-info/eira-info.component";
import { EquipmentTableItem } from "../equipment/table/equipment-table/equipment-table.component";
import { CustomerDataService } from "../service/data/customer/customer-data.service";

interface Site {
  value: string;
  viewValue: string;
}
interface State {
  value: string;
  viewValue: string;
}
interface Category {
  value: string;
  viewValue: string;
}
interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-eira-tkt-search",
  templateUrl: "./eira-tkt-search.component.html",
  styleUrls: ["./eira-tkt-search.component.css"],
})
export class EiraTktSearchComponent implements OnInit {
  sites = [];
  equipments: EquipmentTableItem[];
  ticketCategories: any = [];


  @ViewChild(EiraInfoComponent)
  private eiraInfoComponent: EiraInfoComponent;

  ticketSearchForm = this.fb.group({
    from: [null, Validators.compose([Validators.required])],
    to: [null, Validators.compose([Validators.required])],
    siteId: [null, Validators.compose([Validators.required])],
    severity: [null, Validators.compose([Validators.required])],
    status: [null, Validators.compose([Validators.required])],
    category: [null, Validators.compose([Validators.required])],
  });

  states: State[] = [
    { value: "open", viewValue: "Open" },
    { value: "closed", viewValue: "Closed" },
    { value: "hold", viewValue: "Hold" },
  ];
  categories: Category[] = [
    { value: "Active-0", viewValue: "Active" },
    { value: "Inactive-1", viewValue: "Inactive" },
    { value: "Disabled-2", viewValue: "Disabled" },
  ];
  priority: Priority[] = [
    { value: "Busy-0", viewValue: "Busy" },
    { value: "Free-1", viewValue: "Free" },
    { value: "At work-2", viewValue: "At work" },
  ];

  constructor(
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getSites();
    this.getAllTicketCategories();
  }

  getSites() {
    this.customerDataService.getSiteDetails().subscribe((response) => {
      this.sites = response;
    });
  }

  getAllTicketCategories() {
    this.customerDataService.getAllTicketCategories().subscribe((response) => {
      this.ticketCategories = response;
    });
  }

  onSubmit() {
    var searchCriteria = this.ticketSearchForm.value;
    
  if ((this.ticketSearchForm.get('siteId').valid || this.ticketSearchForm.get('severity').valid || this.ticketSearchForm.get('status').valid || this.ticketSearchForm.get('category').valid) || (this.ticketSearchForm.get('from').valid && this.ticketSearchForm.get('to').valid)) {
    this.eiraInfoComponent.searchCriteria = searchCriteria;
    this.eiraInfoComponent.refresh();
    console.log(JSON.stringify(searchCriteria));
    } else {
      this.showSnackBar("Select atleast one value or Select Both Start and End Date!");
    }

  
    

  }

  showSnackBar(msg: any) {
    this.snackBar.open(msg, "Close", {
      duration: 2000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  resetForm() {

    this.ticketSearchForm.get("from").updateValueAndValidity();
    this.ticketSearchForm.get("to").updateValueAndValidity();
    this.ticketSearchForm.get("siteId").updateValueAndValidity();
    this.ticketSearchForm.get("severity").updateValueAndValidity();
    this.ticketSearchForm.get("status").updateValueAndValidity();
    this.ticketSearchForm.get("category").updateValueAndValidity();

    this.ticketSearchForm.reset();

  }
}
