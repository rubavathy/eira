import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermsissionTableComponent } from './user-permsission-table.component';

describe('UserPermsissionTableComponent', () => {
  let component: UserPermsissionTableComponent;
  let fixture: ComponentFixture<UserPermsissionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPermsissionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermsissionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
