import { ViewEncapsulation, Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginStatusService } from "../service/login-status.service";
import { SimpleAuthenticationService } from "../service/simple-authentication.service";
import { TokenStorageService } from "../service/tokenStorage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  isUserLoggedIn = false;
  isInValidLogin = false;
  hide = true;

  isLoggingIn = false;
  buttonText = "Login";

  loginForm = this.fb.group({
    username: ["rupa", Validators.required],
    password: [null, Validators.required],
  });

   constructor(
    private router: Router,
    private simpleAuthenticationService: SimpleAuthenticationService,
    private _loginStatusService: LoginStatusService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService
  ) {}
  ngOnInit(): void {
    console.log("Inside init of Login");
    //this.loginForm.reset();

   }

  submitForm() {
    if (this.loginForm.valid) {
      this.isLoggingIn = true;

      setTimeout(() => {
        this.handleLogin();
      }, 4000);
    } else {
      this.isInValidLogin = true;
    }
  }

  handleLogin() {
    if (this.loginForm.valid) {
      var loginData = this.loginForm.value;
      var username = loginData.username;
      var password = loginData.password;

      this.simpleAuthenticationService
        .authenticate(username, password)
        .subscribe(
          (data) => {
            console.log(data);
            this.isLoggingIn = false;
            this.buttonText = "Login";
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUser(data, username);

            this.isUserLoggedIn = true;
            this._loginStatusService.isUserLoggedIn.next(this.isUserLoggedIn);
            this.router.navigate(["dashboard"]);

            //this.isLoginFailed = false;
            //this.isLoggedIn = true;
            //this.roles = this.tokenStorage.getUser().roles;
            //this.reloadPage();
          },
          (err) => {
            this.isUserLoggedIn = false;

            this.isInValidLogin = true;
            this.buttonText = "Login";
            this.isLoggingIn = false;
          }
        );
    }
  }
}
