import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatusService } from '../service/login-status.service';
import { SidenavService } from '../service/sidenav.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  pageTitle: string;
  username: string;


  sideNavMenuExpandedState: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, 
    private _loginStatusService:LoginStatusService,
    private router: Router,
    private _sidenavService: SidenavService,
    ) { }


  ngOnInit(): void {
    this.username = this.tokenStorageService.getUsername();

  }

  toggleSideNavMenu() {

    // this._sidenavService.sideNavState$.subscribe((res) => {
    //   this.sideNavMenuExpandedState = res;
    // });
    // this._sidenavService.sideNavState$.next(! this.sideNavMenuExpandedState);
  }

  logOut(): void {
    console.log("Inside Logout");
    this.tokenStorageService.logOut();
    this._loginStatusService.isUserLoggedIn.next(false);

    this.router.navigate(['/login']);
  }

}
