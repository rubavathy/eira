import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatusService } from '../service/login-status.service';
import { TokenStorageService } from '../service/tokenStorage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,  
    private router: Router,
    private _loginStatusService: LoginStatusService,
    
    ) { 
      console.log("inside logout constructor");
    }

  ngOnInit(): void {
    console.log("inside logout");
    this.tokenStorageService.logOut();
    this._loginStatusService.isUserLoggedIn.next(false);

    this.router.navigate(['/login']);
  }

}
