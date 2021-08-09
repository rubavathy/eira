import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionMappingTableComponent } from './user-permission-mapping-table.component';

describe('UserPermissionMappingTableComponent', () => {
  let component: UserPermissionMappingTableComponent;
  let fixture: ComponentFixture<UserPermissionMappingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPermissionMappingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionMappingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
