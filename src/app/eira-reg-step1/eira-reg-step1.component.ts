import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eira-reg-step1',
  templateUrl: './eira-reg-step1.component.html',
  styleUrls: ['./eira-reg-step1.component.css']
})
export class EiraRegStep1Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  handleSignup() {
    this.router.navigate(['user-registration']);

  }
}
