import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSiteMappingComponent } from './user-site-mapping.component';

describe('UserSiteMappingComponent', () => {
  let component: UserSiteMappingComponent;
  let fixture: ComponentFixture<UserSiteMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSiteMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSiteMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
