import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermissionMappingComponent } from './user-permission-mapping.component';

describe('UserPermissionMappingComponent', () => {
  let component: UserPermissionMappingComponent;
  let fixture: ComponentFixture<UserPermissionMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPermissionMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
