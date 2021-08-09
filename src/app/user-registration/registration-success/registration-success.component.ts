import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatusService } from 'src/app/service/login-status.service';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.css'],

})
export class RegistrationSuccessComponent implements OnInit {

  constructor(    private router: Router,
    private _loginStatusService: LoginStatusService,

    ) { }

  ngOnInit() {
  }

  goToDashboard() {
    this._loginStatusService.loginState$.next(true);

    this.router.navigate(['dashboard']);

  }
}
