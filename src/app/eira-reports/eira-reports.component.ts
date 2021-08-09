import { Component, OnInit } from '@angular/core';

interface List {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-eira-reports',
  templateUrl: './eira-reports.component.html',
  styleUrls: ['./eira-reports.component.css']
})
export class EiraReportsComponent implements OnInit {

  lists: List[] = [
    {value: 'Active-0', viewValue: 'Active'},
    {value: 'Inactive-1', viewValue: 'Inactive'},
    {value: 'Disabled-2', viewValue: 'Disabled'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
