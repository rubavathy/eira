import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSiteMappingTableComponent } from './user-site-mapping-table.component';

describe('UserSiteMappingTableComponent', () => {
  let component: UserSiteMappingTableComponent;
  let fixture: ComponentFixture<UserSiteMappingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSiteMappingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSiteMappingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
