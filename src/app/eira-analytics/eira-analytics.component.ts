import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-eira-analytics',
  templateUrl: './eira-analytics.component.html',
  styleUrls: ['./eira-analytics.component.css']
})
export class EiraAnalyticsComponent implements OnInit {
  foods: Food[] = [
    {value: 'some option-0', viewValue: 'Some option'},
    {value: 'some option-1', viewValue: 'Some option'},
    {value: 'some option-2', viewValue: 'Some option'}
  ];
  dataSource: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  typesOfShoes: string[] = ['Daily','DGR', 'Monitoring', 'String'];

  constructor() { }

  ngOnInit() {
  }

}
