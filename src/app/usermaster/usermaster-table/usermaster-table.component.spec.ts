import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermasterTableComponent } from './usermaster-table.component';

describe('UsermasterTableComponent', () => {
  let component: UsermasterTableComponent;
  let fixture: ComponentFixture<UsermasterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermasterTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermasterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
