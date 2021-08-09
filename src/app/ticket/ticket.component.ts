import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { EquipmentTableComponent, EquipmentTableItem } from "../equipment/table/equipment-table/equipment-table.component";
import { CustomerDataService } from "../service/data/customer/customer-data.service";

@Component({
  selector: "app-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: ["./ticket.component.css"],
})
export class TicketComponent implements OnInit {
  sites = [];
  equipments: EquipmentTableItem[];
  ticketCategories:any = [];
  ticketForm = this.fb.group({
    ticketId: -1,
    siteId: [null, Validators.required],
    severity: [null, Validators.required],
    assignedTo: -1,
    description: [null, Validators.required],
    startedOn: null,
    completedBy: -1,
    completedOn: "",
    ticketStatus: "",
    ticketType: [null, Validators.required],
    ticketCategory: [null, Validators.required],
    ticketDetail: "",
    scheduledOn: "",
    remarks: "",
    active: null,
    equipmentIds: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private customerDataService: CustomerDataService
  ) {}

  ngOnInit(): void {
    this.getSites();

  }


  getEquipmentsBySiteId(siteId: any) {


    this.customerDataService
      .getEquipmentDetailsBySite(siteId)
      .subscribe((data) => {
        console.log(data.status);
        if (data.status === 200) {
          this.equipments = data.body as EquipmentTableItem[];
        } else {
          this.equipments = [];

        }

      });
  }
  onSubmit() {
    if (this.ticketForm.valid) {
      this.createTicket();
    } else {
      this.showSnackBar("Not enough details to Create Ticket!!");

    }
  }

  createTicket() {
    var ticketJsonData = this.ticketForm.value;

    console.log(JSON.stringify(ticketJsonData));
    if (this.ticketForm.get("ticketId").value === -1) {
      this.customerDataService.createTicket(ticketJsonData).subscribe(
        (data) => {
          console.log(data);
          this.showSnackBar("Ticket created Successfully!");

          this.ticketForm.reset();
          this.resetForm();
        },
        (err) => {
          console.log(err);
          this.showSnackBar(err.error.message);
        }
      );
    }
  }

  showSnackBar(msg: any) {
    this.snackBar.open(msg, "Close", {
      duration: 2000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  getSites() {
    this.customerDataService.getSiteDetails().subscribe((response) => {
      this.sites = response;
    });
  }


  getTicketCategoriesByType(ticketType:any) {
    console.log("Ticket Type>>" + ticketType)
    this.customerDataService.getTicketCategoriesByType(ticketType).subscribe((response) => {
      this.ticketCategories = response;
    });
  }

  resetForm() {
    this.ticketForm.get("ticketId").updateValueAndValidity();
    this.ticketForm.get("description").clearValidators();
    this.ticketForm.get("description").updateValueAndValidity();
    this.ticketForm.get("remarks").updateValueAndValidity();
    this.ticketForm.get("subject").updateValueAndValidity();

    this.ticketForm.reset();
  }


}
