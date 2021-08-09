import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionMappingGridComponent } from './user-permission-mapping-grid.component';

describe('UserPermissionMappingGridComponent', () => {
  let component: UserPermissionMappingGridComponent;
  let fixture: ComponentFixture<UserPermissionMappingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPermissionMappingGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionMappingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
