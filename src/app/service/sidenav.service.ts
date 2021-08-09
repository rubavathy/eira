import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SidenavService {
  // With this subject you can save the sidenav state and consumed later into other pages.
  public sideNavState$:  BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}
}
