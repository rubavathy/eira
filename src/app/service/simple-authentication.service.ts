import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { USER_KEY } from './tokenStorage.service';

const AUTH_API = environment.apiUrl + '/user/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SimpleAuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username:string, password:string):  Observable<any>{

    return this.http.post(AUTH_API, {
      username,
      password
    }, httpOptions);

    
  }

  isUserLoggedIn() {
    let user = localStorage.getItem(USER_KEY);

    if (user == null || user === undefined ) 
      return false;
    if (Object.keys(user).length === 0) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem(USER_KEY);
  }
}
