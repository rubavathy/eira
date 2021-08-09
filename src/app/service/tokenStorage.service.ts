import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
export const USER_KEY = 'auth-user';
export const USER_NAME = 'username';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  logOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_NAME);

    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any, username: string): void {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_NAME);

    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(USER_NAME, username);
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getUsername(): string {
    const username = localStorage.getItem(USER_NAME);
    if (username) {
      return username;
    }

    return '';
  }
}
