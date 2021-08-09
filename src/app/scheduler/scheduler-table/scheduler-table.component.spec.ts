import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerTableComponent } from './scheduler-table.component';

describe('SchedulerTableComponent', () => {
  let component: SchedulerTableComponent;
  let fixture: ComponentFixture<SchedulerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
