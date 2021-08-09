import { Component, ViewEncapsulation } from "@angular/core";
import { count, map } from "rxjs/operators";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { CustomerDataService } from "../service/data/customer/customer-data.service";
import { DatePipe } from "@angular/common";

export class SiteCount {
  count: number;
  plantType: string;
  totalCount: number;
}
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  siteCountDetails: SiteCount[];
  plantTypes: string[] = [];
  countDetails: number[] = [];
  totalCount: number = 0;

  latitude = 12.92168;
  longitude = 80.113831;
  type = "ROADMAP";

  current_date = new Date();
  server_date = this.datepipe.transform(this.current_date, "dd-MM-yyyy hh:mm");

  latest_date = this.datepipe.transform(
    this.current_date.getDate() - 4,
    "dd-MM-yyyy hh:mm"
  );

  config = { displayModeBar: false, responsive: true };

  siteCountData;
  ticketCount: number;
  siteDetails: Object;
  constructor(
    private customerDataService: CustomerDataService,
    private datepipe: DatePipe
  ) {}

  initSiteCountGraph() {
    this.customerDataService.getSiteCountDetails().subscribe((response) => {
      this.siteCountDetails = response as SiteCount[];
      console.log("siteCount>>" + JSON.stringify(this.siteCountDetails));

      for (let counts of this.siteCountDetails) {
        this.plantTypes.push(counts.plantType + "-" + counts.count);
        this.countDetails.push(counts.count);
        this.totalCount = counts.totalCount;
      }
    });
  }

  ngOnInit(): void {
    this.initSiteCountGraph();
    this.initSiteStatusGraph();
    this.getTicketDetails();
    this.getSiteDetailsForLocation();
  }

  getSiteDetailsForLocation() {
    this.customerDataService.getAllSiteDetails(1).subscribe((response) => {
      this.siteDetails = response;
      console.log(response);
    });
  }

  getTicketDetails() {
    this.customerDataService
      .getTicketDetailsByStatus("created")
      .subscribe((response) => {
        this.ticketCount = response as number;
      });
  }

  onMouseOver(infoWindow, agm) {
    if (agm.lastOpen != null) {
      agm.lastOpen.close();
    }

    agm.lastOpen = infoWindow;

    infoWindow.open();
  }


  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
}

  public siteCountGraph = {
    data: [],
    layout: {
      width: 200,
      height: 200,
      margin: { t: 0, b: 130, l: 10, r: 10 },
      paper_bgcolor: "transparent",
    },
    config: this.config,
  };

  public siteStatusGraph = { data: [], layout: {} };

  initSiteStatusGraph() {
    this.siteStatusGraph.data = [
      {
        values: [20, 3, 8, 1],
        labels: ["Active-20", "Warning-3", "Down-8", "Offline-1"],
        domain: { column: 0 },
        name: "Site Status",
        hoverinfo: "label+percent",
        hole: 0.4,
        type: "pie",
      },
    ];

    this.siteStatusGraph.layout = {
      annotations: [
        {
          font: {
            size: 20,
          },
          showarrow: false,
          text: "",
          x: 0.17,
          y: 0.5,
        },
      ],
      height: 250,
      width: 200,
      margin: { t: 0, b: 160, l: 50, r: 70 },
      paper_bgcolor: "transparent",
      showlegend: true,
      legend: {
        x: 1.1,
      },
    };
  }
}
