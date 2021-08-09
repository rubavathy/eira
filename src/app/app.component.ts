import { HostListener } from "@angular/core";
import { Component } from "@angular/core";
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, RouterState } from "@angular/router";
import { filter } from "rxjs/operators";
import { onMainContentChange } from "./animations/animations";
import { LoginStatusService } from "./service/login-status.service";
import { ShowOverlayStatusService } from "./service/showOverlay-status.service";
import { SidenavService } from "./service/sidenav.service";
import { TokenStorageService } from "./service/tokenStorage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [onMainContentChange],
})
export class AppComponent {
  pageTitle = "eira";
  public onSideNavChange: boolean = null;
  public isUserLoggedIn: boolean;

  public showOverlay:boolean = true;


  public screenWidth: any;
  public screenHeight: any;

  constructor(
    private _sidenavService: SidenavService,
    private tokenStorageService: TokenStorageService,
    private loginStatusService: LoginStatusService,
    private showOverlayStatusService: ShowOverlayStatusService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    
    this.loginStatusService.isUserLoggedIn.subscribe((value) => {
      this.isUserLoggedIn = value;
    });


    this._sidenavService.sideNavState$.subscribe((res) => {
      console.log("side Nav State>>" +res);
      if (this.isUserLoggedIn)
        this.onSideNavChange = res;
      else 
        this.onSideNavChange = undefined;

      console.log("side Nav State>>" +this.onSideNavChange);
    });


    this.activatedRoute.data.subscribe(data  => {
      this.pageTitle = data.pageTitle;

      console.log("Page data::" + JSON.stringify(data));
  });
    let user = this.tokenStorageService.getUser();


    if (Object.keys(user).length === 0) {
      this.isUserLoggedIn = false;
    } else {
      this.isUserLoggedIn = true;
    }

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

     
    




 
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    let user = this.tokenStorageService.getUser();



    if (Object.keys(user).length === 0) {
      this.isUserLoggedIn = false;
    } else {
      this.isUserLoggedIn = true;
    }

    console.log("isUserLoggedIn>>" + this.isUserLoggedIn);

  }


  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlayStatusService.showOverlay.next(true);

      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlayStatusService.showOverlay.next(false);

      this.showOverlay = false;

      this.activatedRoute.firstChild.data.subscribe(data => {
        console.log("page data" + JSON.stringify(data));;
        this.pageTitle = data.pageTitle;
      })
      
      //console.log(this.activatedRoute.snapshot.data['asdf']); // data is defined but asdf is not :(

    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlayStatusService.showOverlay.next(false);

      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlayStatusService.showOverlay.next(false);

      this.showOverlay = false;
    }
  }

  refresh() {
    let user = this.tokenStorageService.getUser();

    console.log("Logged in User>>" + JSON.stringify(user));
    if (Object.keys(user).length === 0) {
      this.isUserLoggedIn = false;
    } else {
      this.isUserLoggedIn = true;
    }

  }

  getLeftMargin() {
    console.log("Inside getLeftMargin");

    if (this.isUserLoggedIn) {
      return '70px !important';
    } else {
      return '0px !important';
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
}
